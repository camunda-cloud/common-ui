import {
	Component,
	Host,
	h,
	Prop,
	Listen,
	Event,
	EventEmitter,
	State,
} from '@stencil/core'

@Component({
	tag: 'cm-toggle',
	styleUrl: 'cm-toggle.scss',
	shadow: true,
})
export class CmToggle {
	@Prop({ reflect: true }) label: string = ''
	@Prop({ reflect: true }) checked: boolean = false
	@Prop({ reflect: true }) disabled: boolean = false

	@Event() cmInput: EventEmitter<{ isChecked: boolean }>

	@State() latestFocusWasClick: boolean = false
	toggle: HTMLDivElement

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

		if (event.key === ' ') {
			if (!this.disabled) {
				this.toggleCheck()
			}
		}
	}

	// Prevent clicks from giving visual focus
	@Listen('mousedown', { passive: false })
	handleMouseDown(event: MouseEvent) {
		this.latestFocusWasClick = true
		event.preventDefault()
	}

	@Listen('click')
	handleClick() {
		if (!this.disabled) {
			this.toggleCheck()
		}
	}

	toggleCheck() {
		this.checked = !this.checked
		this.cmInput.emit({ isChecked: this.checked })
	}

	componentWillUpdate() {
		if (this.latestFocusWasClick) {
			this.toggle.focus()
		}
	}

	render() {
		let toggleClasses = {
			toggle: true,
			checked: this.checked,
			clicked: this.latestFocusWasClick,
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
					class={toggleClasses}
					ref={(element) => (this.toggle = element as HTMLDivElement)}
				></div>
				<label>{this.label}</label>
			</Host>
		)
	}
}
