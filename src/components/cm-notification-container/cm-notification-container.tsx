import { Component, Host, h, Method, Element } from '@stencil/core'

export type NotificationItem = {
	appearance?: 'success' | 'error' | 'info'
	headline: string
	description?: string
	navigationLabel?: string
	navigationTarget?: string
	userDismissable?: boolean
	notificationNavigation?: (
		event: CustomEvent<{ navigationTarget: string }>,
	) => void
}

@Component({
	tag: 'cm-notification-container',
	styleUrl: 'cm-notification-container.scss',
	shadow: true,
})
export class CmNotificationContainer {
	@Element() el: HTMLElement

	notificationQueue: Array<NotificationItem> = []
	visibleNotifications: Array<HTMLCmNotificationElement> = []
	durationStore: Map<HTMLCmNotificationElement, number> = new Map()

	maxVisibleNotifications = 5
	notificationDuration = 7000

	@Method() async enqueueNotification(notification: NotificationItem) {
		if (this.maxVisibleNotifications <= this.visibleNotifications.length) {
			this.notificationQueue.push(notification)
		} else {
			this.renderNewNotification(notification)
		}
	}

	componentDidLoad() {
		setInterval(() => {
			this.countTimerDown(100)
		}, 100)
	}

	countTimerDown(expiredTime: number) {
		let entries = Array.from(this.durationStore.entries())

		for (let [key, value] of entries) {
			if (!document.hidden) {
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

		this.durationStore.set(newNotification, this.notificationDuration)

		newNotification.headline = notification.headline

		if (notification?.appearance) {
			newNotification.appearance = notification.appearance
		}

		if (notification?.description) {
			newNotification.description = notification.description
		}

		if (notification?.navigationLabel) {
			newNotification.navigationLabel = notification.navigationLabel
		}

		if (notification.userDismissable != null) {
			newNotification.userDismissable = notification.userDismissable
		}

		if (notification?.navigationTarget) {
			newNotification.navigationTarget = notification.navigationTarget
		}

		if (notification?.notificationNavigation) {
			newNotification.addEventListener(
				'cmNotificationNavigation',
				notification.notificationNavigation,
			)
		}

		newNotification.classList.add('hidden')

		notificationContainer.appendChild(newNotification)
		this.visibleNotifications.push(newNotification)

		newNotification.addEventListener('didLoad', () => {
			newNotification.classList.remove('hidden')

			notificationContainer.animate(
				[
					{ transform: `translateY(${newNotification.clientHeight}px)` },
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
						this.visibleNotifications = this.visibleNotifications.filter(
							(item) => item !== newNotification,
						)

						newNotification.remove()

						if (this.notificationQueue.length) {
							setTimeout(() => {
								requestAnimationFrame(() => {
									this.renderNewNotification(this.notificationQueue.shift())
								})
							}, 200)
						}
					})
			})
		})
	}

	render() {
		return (
			<Host>
				<div id="notificationContainer"></div>
			</Host>
		)
	}
}
