import {
	Component,
	Host,
	h,
	Prop,
	Element,
	Event,
	EventEmitter,
} from '@stencil/core'

import { JSXBase, Method, State } from '@stencil/core/internal'
import { onThemeChange, Theme } from '../../../globalHelpers'

@Component({
	tag: 'cm-notification',
	styleUrl: 'cm-notification.scss',
	shadow: true,
})
export class CmNotification {
	@Prop() appearance: 'success' | 'error' | 'info' = 'info'
	@Prop() headline: string
	@Prop() description: string = ''
	@Prop() navigationLabel: string = ''
	@Prop() userDismissable: boolean = true

	@Element() el: HTMLElement
	@Event() cmDismissed: EventEmitter<{}>
	@Event() didLoad: EventEmitter<{}>
	@Event() cmNotificationNavigation: EventEmitter<{}>
	@State() theme: Theme = 'Light'

	@Method()
	async dismiss() {
		this.cmDismissed.emit()
	}

	protected _isBeingHovered = false

	@Method() async isBeingHovered() {
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
		let classes = {
			container: true,
			[this.theme]: true,
		}

		let link: JSXBase.IntrinsicElements,
			description: JSXBase.IntrinsicElements,
			dismissButton: JSXBase.IntrinsicElements

		if (this.description) {
			if (this.navigationLabel) {
				link = (
					<cm-button
						appearance="link"
						label={this.navigationLabel}
						onCmPress={() => {
							this.cmNotificationNavigation.emit({})
							this.dismiss()
						}}
					></cm-button>
				)
			}

			description = (
				<div>
					<div class="headline">{this.headline}</div>
					<div class="description">
						{this.description}
						&nbsp;
						{link}
					</div>
				</div>
			)
		} else {
			if (this.navigationLabel) {
				link = (
					<cm-button
						style={{ fontSize: '15px' }}
						appearance="link"
						label={this.navigationLabel}
						onCmPress={() => {
							this.cmNotificationNavigation.emit({})
							this.dismiss()
						}}
					></cm-button>
				)
			}

			description = (
				<div class="headlineWithoutDescription">
					{this.headline}
					&nbsp;
					{link}
				</div>
			)
		}

		if (this.userDismissable) {
			dismissButton = (
				<cm-icon-button
					icon={'close'}
					onCmPress={() => this.dismiss()}
				/>
			)
		}

		return (
			<Host>
				<div class={classes}>
					<div class={`icon ${this.appearance}`} />
					<div class="contentContainer">{description}</div>
					{dismissButton}
				</div>
			</Host>
		)
	}
}
