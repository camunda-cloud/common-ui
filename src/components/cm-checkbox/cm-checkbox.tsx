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
	tag: 'cm-checkbox',
	styleUrl: 'cm-checkbox.scss',
	shadow: true,
})
export class CmCheckbox {
	@Prop({ reflect: true, mutable: true }) label: string = ''
	@Prop({ reflect: true, mutable: true }) helperText: string = ''
	@Prop({ reflect: true, mutable: true }) checked: boolean = false
	@Prop({ reflect: true, mutable: true }) indeterminate: boolean = false
	@Prop({ reflect: true, mutable: true }) disabled: boolean = false

	/**
	 * Enables `cmInput` Events being emitted when the checked attribute changes.
	 */
	@Prop({ reflect: true, mutable: true }) enableAttributeEmit: boolean = false

	@Watch('checked')
	checkedChangeHandler() {
		if (this.enableAttributeEmit) {
			this.cmInput.emit({ isChecked: this.checked, triggeredBy: 'API' })
		}
	}

	/**
	 * Emitted whenever the checked state changes.
	 */
	@Event() cmInput: EventEmitter<{
		isChecked: boolean
		triggeredBy: 'User' | 'API'
	}>

	checkbox: HTMLDivElement

	@Listen('keydown')
	handleKeyDown(event: KeyboardEvent) {
		if (event.key === ' ') {
			if (!this.disabled) {
				this.toggleCheck({ triggeredBy: 'User' })
				event.preventDefault()
			}
		}
	}

	@Listen('click')
	handleClick() {
		if (!this.disabled) {
			this.toggleCheck({ triggeredBy: 'User' })
		}
	}

	/**
	 * Toggles the checked state. Respects the disabled state, unless forced.
	 */
	@Method()
	async toggleCheck(
		options: { forceToggle?: boolean; triggeredBy?: 'User' | 'API' } = {},
	) {
		if (!this.disabled || options.forceToggle) {
			this.checked = !this.checked
			this.cmInput.emit({
				isChecked: this.checked,
				triggeredBy: options.triggeredBy ?? 'API',
			})
		}
	}

	/**
	 * Sets the checked state to true. Respects the disabled state, unless forced.
	 */
	@Method()
	async check(
		options: { forceCheck?: boolean; triggeredBy?: 'User' | 'API' } = {},
	) {
		if (!this.disabled || options.forceCheck) {
			if (this.checked === false) {
				this.checked = true
				this.cmInput.emit({
					isChecked: this.checked,
					triggeredBy: options.triggeredBy ?? 'API',
				})
			}
		}
	}

	/**
	 * Sets the checked state to false. Respects the disabled state, unless forced.
	 */
	@Method()
	async uncheck(
		options: { forceUncheck?: boolean; triggeredBy?: 'User' | 'API' } = {},
	) {
		if (!this.disabled || options.forceUncheck) {
			if (this.checked === true) {
				this.checked = false
				this.cmInput.emit({
					isChecked: this.checked,
					triggeredBy: options.triggeredBy ?? 'API',
				})
			}
		}
	}

	render() {
		let checkboxClasses = {
			checkbox: true,
			indeterminate: this.indeterminate,
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
					class={{ container: true, disabled: this.disabled }}
					tabindex={tabIndex}
				>
					<div
						class={checkboxClasses}
						ref={(element) =>
							(this.checkbox = element as HTMLDivElement)
						}
						role="checkbox"
						aria-disabled={this.disabled}
					></div>
					<label>{this.label}</label>
					<cm-text appearance="helperText">{this.helperText}</cm-text>
				</div>
			</Host>
		)
	}
}
