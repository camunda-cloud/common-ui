import {
	Component,
	ComponentInterface,
	Host,
	h,
	Prop,
	EventEmitter,
	Listen,
	Event,
	State,
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
	@State() latestFocusWasClick: boolean = false

	@Event() cmPress: EventEmitter<{}>
	@Element() el: HTMLElement

	@Method()
	async press() {
		this.cmPress.emit()
	}

	// Prevent clicks from giving visual focus
	@Listen('mousedown', { passive: false })
	handleMouseDown(event: MouseEvent) {
		this.latestFocusWasClick = true
		event.preventDefault()
	}

	@Listen('blur', { passive: false })
	handleBlur() {
		this.latestFocusWasClick = false
	}

	@Listen('click')
	handleClick() {
		if (!this.disabled) {
			this.press()
		}
	}

	@Listen('keydown')
	handleKeyDown(event: KeyboardEvent) {
		if (
			!(event.key === 'Control') &&
			!(event.key === 'Meta') &&
			!(event.key === 'Alt') &&
			!(event.key === 'Shift' && event.code !== 'Tab')
		) {
			this.latestFocusWasClick = false
		}

		if (event.key === ' ' || event.key === 'Enter') {
			if (!this.disabled) {
				this.press()
			}
		}
	}

	componentWillUpdate() {
		if (this.latestFocusWasClick) {
			this.el.focus()
		}
	}

	render() {
		let classes = {
			clicked: this.latestFocusWasClick,
			disabled: this.disabled,
		}

		let tabIndex = 0

		if (this.disabled) {
			tabIndex = -1
		}

		return (
			<Host
				tabindex={tabIndex}
				class={classes}
				role="button"
				aria-disabled={this.disabled}
				aria-label={this.icon}
			>
				<cm-icon icon={this.icon} />
			</Host>
		)
	}
}
