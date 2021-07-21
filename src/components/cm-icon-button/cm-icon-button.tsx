import {
	Component,
	ComponentInterface,
	Host,
	h,
	Prop,
	EventEmitter,
	Listen,
	Event,
	Element,
	Method,
} from '@stencil/core'

import { CmIcon } from '../cm-icon/cm-icon'

@Component({
	tag: 'cm-icon-button',
	styleUrl: 'cm-icon-button.scss',
	shadow: true,
})
export class CmIconButton implements ComponentInterface {
	@Prop({ mutable: true }) icon: CmIcon['icon']

	@Prop({ mutable: true }) disabled: boolean = false
	@Prop({ mutable: true }) ignoreTheme: boolean = false

	/**
	 * Emitted when the button is pressed or either Spacebar or Enter are being pressed when the button is focused.
	 */
	@Event() cmPress: EventEmitter<{}>

	@Element() el: HTMLElement

	/**
	 * Triggers the press event. Respects the disabled state unless forced.
	 */
	@Method()
	async press(options: { forcePress?: boolean } = {}) {
		if (!this.disabled || options.forcePress) {
			this.cmPress.emit()
		}
	}

	@Listen('click')
	handleClick() {
		if (!this.disabled) {
			this.press()
		}
	}

	@Listen('keydown')
	handleKeyDown(event: KeyboardEvent) {
		if (event.key === ' ' || event.key === 'Enter') {
			if (!this.disabled) {
				this.press()
			}
		}
	}

	render() {
		let classes = {
			disabled: this.disabled,
		}

		let tabIndex = 0

		if (this.disabled) {
			tabIndex = -1
		}

		return (
			<Host>
				<div
					tabindex={tabIndex}
					class={classes}
					role="button"
					aria-disabled={this.disabled}
					aria-label={this.icon}
				>
					<cm-icon icon={this.icon} ignoreTheme={this.ignoreTheme} />
				</div>
			</Host>
		)
	}
}
