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
	tag: 'cm-checkbox',
	styleUrl: 'cm-checkbox.scss',
	shadow: true,
})
export class CmCheckbox {
	@Prop({ reflect: true, mutable: true }) label: string = ''
	@Prop({ reflect: true, mutable: true }) checked: boolean = false
	@Prop({ reflect: true, mutable: true }) indeterminate: boolean = false
	@Prop({ reflect: true, mutable: true }) disabled: boolean = false

	@Event() cmInput: EventEmitter<{ isChecked: boolean }>

	@State() latestFocusWasClick: boolean = false
	checkbox: HTMLDivElement

	@Listen('keydown')
	handleKeyDown(event: KeyboardEvent) {
		if (
			event.key !== 'Control' &&
			event.key !== 'Shift' &&
			event.key !== 'Meta' &&
			event.key !== 'Alt'
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
			this.checkbox.focus()
		}
	}

	render() {
		let checkboxClasses = {
			checkbox: true,
			indeterminate: this.indeterminate,
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
					class={checkboxClasses}
					ref={(element) =>
						(this.checkbox = element as HTMLDivElement)
					}
					role="checkbox"
					aria-disabled={this.disabled}
				></div>
				<label>{this.label}</label>
			</Host>
		)
	}
}
