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
} from '@stencil/core'

@Component({
	tag: 'cm-button',
	styleUrl: 'cm-button.scss',
	shadow: true,
})
export class CmButton implements ComponentInterface {
	@Prop() appearance: 'main' | 'primary' | 'secondary' | 'danger' | 'link' =
		'main'
	@Prop() label: string = ''
	@Prop() disabled: boolean = false
	@State() latestFocusWasClick: boolean = false

	@Event() cmPress: EventEmitter<{}>
	@Element() el: HTMLElement

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
			this.cmPress.emit()
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
				this.cmPress.emit()
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
			[this.appearance]: true,
			clicked: this.latestFocusWasClick,
			disabled: this.disabled,
		}

		let tabIndex = 0

		if (this.disabled) {
			tabIndex = -1
		}

		return (
			<Host tabindex={tabIndex} class={classes}>
				{this.label}
			</Host>
		)
	}
}
