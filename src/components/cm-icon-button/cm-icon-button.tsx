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

@Component({
	tag: 'cm-icon-button',
	styleUrl: 'cm-icon-button.scss',
	shadow: true,
})
export class CmIconButton implements ComponentInterface {
	@Prop({ mutable: true }) icon:
		| 'contextMenu'
		| 'close'
		| 'closeLarge'
		| 'search'
		| 'help'
		| 'information'
		| 'sort'
		| 'plus'
		| 'minus'
		| 'copy'
		| 'show'
		| 'hide'
		| 'edit'
		| 'delete'
		| 'up'
		| 'down'
		| 'left'
		| 'right'

	@Prop({ mutable: true }) disabled: boolean = false

	@Event() cmPress: EventEmitter<{}>
	@Element() el: HTMLElement

	/**
	 * Triggers a virtual press.
	 */
	@Method()
	async press() {
		this.cmPress.emit()
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
					<cm-icon icon={this.icon} />
				</div>
			</Host>
		)
	}
}
