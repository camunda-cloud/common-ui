import { Component, Host, h, Method, Element } from '@stencil/core'

export type NotificationItem = {
	headline: string
	description?: string
	appearance?: 'success' | 'error' | 'info'
	userDismissable?: boolean
	duration?: number
	navigation?: {
		label: string
		navigationHandler: (event: CustomEvent<{}>) => void
	}
}

@Component({
	tag: 'cm-notification-container',
	styleUrl: 'cm-notification-container.scss',
	shadow: true,
})
export class CmNotificationContainer {
	@Element() el: HTMLElement

	notificationQueue: Array<NotificationItem> = []
	notificationMap: Map<NotificationItem, HTMLCmNotificationElement> =
		new Map()
	visibleNotifications: Array<HTMLCmNotificationElement> = []
	durationStore: Map<HTMLCmNotificationElement, number> = new Map()

	maxVisibleNotifications = 5
	notificationDuration = 7000

	/**
	 * Queues a Notification to be shown. The notification might be shown instantly, if there is space, or later, once space is available.
	 */
	@Method()
	async enqueueNotification(notification: NotificationItem): Promise<{
		hasBeenShown(): boolean
		remove(): void
	}> {
		if (this.maxVisibleNotifications <= this.visibleNotifications.length) {
			this.notificationQueue.push(notification)
		} else {
			this.renderNewNotification(notification)
		}

		return {
			hasBeenShown: () => {
				return !this.notificationQueue.includes(notification)
			},
			remove: () => {
				if (this.notificationQueue.includes(notification)) {
					this.notificationQueue = this.notificationQueue.filter(
						(item) => item !== notification,
					)
				} else {
					let notificationElement =
						this.notificationMap.get(notification)

					if (notificationElement) {
						notificationElement.dismiss()
					}
				}
			},
		}
	}

	componentDidLoad() {
		setInterval(() => {
			this.countTimerDown(100)
		}, 100)
	}

	async countTimerDown(expiredTime: number) {
		let entries = Array.from(this.durationStore.entries())

		for (let [key, value] of entries) {
			if (!document.hidden && !(await key.isBeingHovered())) {
				let newValue = value - expiredTime

				if (newValue <= 0) {
					this.durationStore.delete(key)
					key.dismiss()
				}

				this.durationStore.set(key, newValue)
			}
		}
	}

	private renderNewNotification(notification: NotificationItem) {
		let notificationContainer = this.el.shadowRoot.querySelector(
			'#notificationContainer',
		)
		let newNotification = document.createElement('cm-notification')
		this.notificationMap.set(notification, newNotification)

		newNotification.headline = notification.headline
		newNotification.description = notification.description
		newNotification.appearance = notification.appearance
		newNotification.userDismissable = notification.userDismissable

		if (notification.navigation != null) {
			newNotification.navigationLabel = notification.navigation.label
			newNotification.addEventListener(
				'cmNotificationNavigation',
				notification.navigation.navigationHandler,
			)
		}

		if (
			newNotification.userDismissable ||
			newNotification.userDismissable == null
		) {
			this.durationStore.set(
				newNotification,
				notification.duration ?? this.notificationDuration,
			)
		}

		newNotification.classList.add('hidden')

		notificationContainer.appendChild(newNotification)
		this.visibleNotifications.push(newNotification)

		newNotification.addEventListener('didLoad', () => {
			newNotification.classList.remove('hidden')

			notificationContainer.animate(
				[
					{
						transform: `translateY(${newNotification.clientHeight}px)`,
					},
					{ transform: 'translateY(0%)' },
				],
				{ duration: 150, easing: 'linear' },
			)
		})

		newNotification.addEventListener('cmDismissed', () => {
			this.durationStore.delete(newNotification)

			requestAnimationFrame(() => {
				newNotification
					.animate(
						[
							{ height: `${newNotification.clientHeight}px` },
							{
								opacity: 0,
								height: 0,
								padding: 0,
							},
						],
						{ duration: 150, easing: 'linear' },
					)
					.addEventListener('finish', () => {
						this.notificationMap.delete(notification)
						this.visibleNotifications =
							this.visibleNotifications.filter(
								(item) => item !== newNotification,
							)

						newNotification.remove()

						if (this.notificationQueue.length) {
							setTimeout(() => {
								requestAnimationFrame(() => {
									this.renderNewNotification(
										this.notificationQueue.shift(),
									)
								})
							}, 200)
						}
					})
			})
		})
	}

	render() {
		return (
			<Host aria-live="polite">
				<div id="notificationContainer"></div>
			</Host>
		)
	}
}
