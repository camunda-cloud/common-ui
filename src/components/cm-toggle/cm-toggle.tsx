import {
	Component,
	Host,
	h,
	Prop,
	Listen,
	Event,
	EventEmitter,
	Method,
	Watch,
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

	@Watch('checked')
	themeChangeHandler() {
		this.cmInput.emit({ isChecked: this.checked })
	}

	toggle: HTMLDivElement

	@Listen('keydown')
	handleKeyDown(event: KeyboardEvent) {
		if (event.key === ' ') {
			if (!this.disabled) {
				this.toggleCheck()
			}
		}
	}

	@Listen('click')
	handleClick() {
		if (!this.disabled) {
			this.toggleCheck()
		}
	}

	/**
	 * Toggles the checked state. Respects the disabled state, unless forced.
	 */
	@Method()
	async toggleCheck(options: { forceToggle?: boolean } = {}) {
		if (!this.disabled || options.forceToggle) {
			this.checked = !this.checked
			this.cmInput.emit({ isChecked: this.checked })
		}
	}

	/**
	 * Sets the checked state to true. Respects the disabled state, unless forced.
	 */
	@Method()
	async check(options: { forceCheck?: boolean } = {}) {
		if (!this.disabled || options.forceCheck) {
			if (this.checked === false) {
				this.checked = true
				this.cmInput.emit({ isChecked: this.checked })
			}
		}
	}

	/**
	 * Sets the checked state to false. Respects the disabled state, unless forced.
	 */
	@Method()
	async uncheck(options: { forceUncheck?: boolean } = {}) {
		if (!this.disabled || options.forceUncheck) {
			if (this.checked === true) {
				this.checked = false
				this.cmInput.emit({ isChecked: this.checked })
			}
		}
	}

	render() {
		let toggleClasses = {
			toggle: true,
			checked: this.checked,
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
					role="checkbox"
					aria-disabled={this.disabled}
				></div>
				<label>{this.label}</label>
			</Host>
		)
	}
}
