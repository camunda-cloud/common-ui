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
	@Prop({ mutable: false }) createdAt: number

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
		})
	}

	componentDidLoad() {
		this.el.addEventListener('mouseenter', () => {
			this._isBeingHovered = true
		})

		this.el.addEventListener('mouseleave', () => {
			this._isBeingHovered = false
		})

		this.didLoad.emit() // Necessary for the notification container to access the correct clientHeight
	}

	render() {
		let containerClasses = {
			container: true,
			[this.theme]: true,
			isUserDismissable: this.userDismissable,
			hasDescription: this.description.length !== 0,
		}

		let iconClasses = {
			icon: true,
			[this.appearance]: true,
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
								icon={'close'}
								onCmPress={() => this.dismiss()}
							/>
						) : (
							''
						)}
						<div class="date">
							{Intl.DateTimeFormat('default', {
								hour: 'numeric',
								minute: 'numeric',
							}).format(this.createdAt)}
						</div>
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
