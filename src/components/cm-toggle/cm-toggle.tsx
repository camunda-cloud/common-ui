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
	@Prop({ reflect: true, mutable: true }) label: string = ''
	@Prop({ reflect: true, mutable: true }) checked: boolean = false
	@Prop({ reflect: true, mutable: true }) disabled: boolean = false
	@Prop({ reflect: true, mutable: true })
	preventWatchingCheckedAttribute: boolean = false

	@Watch('checked')
	checkedChangeHandler() {
		if (this.preventWatchingCheckedAttribute) {
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

	toggle: HTMLDivElement

	@Listen('keydown')
	handleKeyDown(event: KeyboardEvent) {
		if (event.key === ' ') {
			if (!this.disabled) {
				this.toggleCheck({ triggeredBy: 'User' })
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
