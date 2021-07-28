import {
	Component,
	Host,
	h,
	Prop,
	Element,
	Event,
	EventEmitter,
} from '@stencil/core'

import { Method, State } from '@stencil/core/internal'
import { onThemeChange, Theme } from '../../../globalHelpers'
import { CmIcon } from '../../cm-icon/cm-icon'

@Component({
	tag: 'cm-notification',
	styleUrl: 'cm-notification.scss',
	shadow: true,
})
export class CmNotification {
	@Prop({ mutable: false }) appearance: 'success' | 'error' | 'info' = 'info'
	@Prop({ mutable: false }) headline: string
	@Prop({ mutable: false }) description: string = ''
	@Prop({ mutable: false }) navigationLabel: string = ''
	@Prop({ mutable: false }) userDismissable: boolean = true
	@Prop({ mutable: false }) showCreationTime: boolean = true
	@Prop({ mutable: false }) createdAt: number = Date.now()

	@State() elapsedTime = 0
	private timer: NodeJS.Timer

	@State() iconColor: CmIcon['color'] = 'medium'

	@Element()
	el: HTMLElement

	/**
	 * Emitted when the Notification is dismissed.
	 */
	@Event() cmDismissed: EventEmitter<{}>

	/**
	 * Emitted when the Navigation is triggered.
	 */
	@Event() cmNotificationNavigation: EventEmitter<{}>

	/**
	 * Emitted when Component has loaded, used as a workaround for the lack of a general 'componentDidLoad' event internally. You should not rely on this event.
	 */
	@Event() didLoad: EventEmitter<{}>

	@State() theme: Theme = 'Light'

	/**
	 * Dismisses the Notification.
	 */
	@Method()
	async dismiss() {
		this.cmDismissed.emit()
	}

	protected _isBeingHovered = false

	/**
	 * Returns the hover state. This is being used to halt Notification-Timeouts.
	 */
	@Method()
	async isBeingHovered() {
		return this._isBeingHovered
	}

	componentWillLoad() {
		onThemeChange((theme) => {
			this.theme = theme
			if (theme === 'Dark') {
				this.iconColor = 'bright'
			} else {
				this.iconColor = 'medium'
			}
		})
	}

	componentDidLoad() {
		this.el.addEventListener('mouseenter', () => {
			this._isBeingHovered = true
		})

		this.el.addEventListener('mouseleave', () => {
			this._isBeingHovered = false
		})

		this.timer = setInterval(() => {
			this.elapsedTime += 1
		}, 1000)

		this.didLoad.emit() // Necessary for the notification container to access the correct clientHeight
	}

	disconnectedCallback() {
		clearInterval(this.timer)
	}

	render() {
		let containerClasses = {
			container: true,
			[this.theme]: true,
			isUserDismissable: this.userDismissable,
			hasDescription: this.description.length !== 0,
			hasTimeOrNavigationLabel: Boolean(
				this.showCreationTime || this.navigationLabel,
			),
		}

		let iconClasses = {
			icon: true,
			[this.appearance]: true,
		}

		let timeDifferential = -Math.trunc(
			Math.abs(this.createdAt - Date.now()) / 1000,
		)

		let timeDifferentialUnit

		if (timeDifferential > -60) {
			timeDifferentialUnit = 'seconds'
		} else {
			timeDifferential = -Math.trunc(Math.abs(timeDifferential) / 60)
			timeDifferentialUnit = 'minutes'
		}

		return (
			<Host>
				<div class="shadowContainer">
					<div class={containerClasses} role="alert">
						<div class={iconClasses} />
						<div class="content">
							<div class="headline">{this.headline}</div>
							<div class="description">{this.description}</div>
						</div>
						{this.userDismissable ? (
							<cm-icon-button
								color={this.iconColor}
								ignoreTheme
								icon={'close'}
								onCmPress={() => this.dismiss()}
							/>
						) : (
							''
						)}
						{this.showCreationTime ? (
							<div class="date">
								{timeDifferential > -10 &&
								timeDifferentialUnit == 'seconds'
									? 'Just now'
									: new Intl.RelativeTimeFormat('en', {
											localeMatcher: 'best fit',
											numeric: 'always',
											style: 'long',
									  }).format(
											timeDifferential,
											timeDifferentialUnit as any,
									  )}
							</div>
						) : (
							''
						)}
						{this.navigationLabel ? (
							<cm-button
								appearance="link"
								label={this.navigationLabel}
								onCmPress={() => {
									this.cmNotificationNavigation.emit({})
									this.dismiss()
								}}
							/>
						) : (
							''
						)}
					</div>
				</div>
			</Host>
		)
	}
}
