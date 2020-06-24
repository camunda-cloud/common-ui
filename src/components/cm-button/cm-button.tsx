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
} from '@stencil/core'

@Component({
	tag: 'cm-button',
	styleUrl: 'cm-button.scss',
	shadow: true,
})
export class CmButton implements ComponentInterface {
	@Prop() appearance: 'main' | 'primary' | 'secondary' | 'danger' = 'main'
	@Prop() label: string = ''
	@Prop() disabled: boolean = false
	@State() latestFocusWasClick: boolean = false

	@Event() cmPress: EventEmitter<{}>
	button: HTMLDivElement

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
			this.button.focus()
		}
	}

	render() {
		let classes = {
			main: false,
			primary: false,
			secondary: false,
			danger: false,
			clicked: this.latestFocusWasClick,
			disabled: this.disabled,
		}

		if (this.appearance === 'main') {
			classes.main = true
		} else if (this.appearance === 'danger') {
			classes.danger = true
		} else if (this.appearance === 'primary') {
			classes.primary = true
		} else {
			classes.secondary = true
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
					ref={(element) => (this.button = element)}
				>
					{this.label}
				</div>
			</Host>
		)
	}
}
