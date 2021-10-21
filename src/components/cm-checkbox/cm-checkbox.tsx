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
	State,
	Element,
} from '@stencil/core'

import { ValidatorResult } from '../../globalHelpers'

@Component({
	tag: 'cm-checkbox',
	styleUrl: 'cm-checkbox.scss',
	shadow: true,
})
export class CmCheckbox {
	@Element() element: HTMLCmCheckboxElement

	@Prop({ reflect: true, mutable: true }) label: string = ''
	@Prop({ reflect: true, mutable: true }) helperText: string = ''
	@Prop({ reflect: true, mutable: true }) checked: boolean = false
	@Prop({ reflect: true, mutable: true }) indeterminate: boolean = false
	@Prop({ reflect: true, mutable: true }) disabled: boolean = false
	@Prop({ reflect: true, mutable: true }) required: boolean = false
	@Prop({ reflect: true, mutable: true }) formName: string = ''

	@State() validationResult: ValidatorResult
	@State() forceRenderingOfValidationState: boolean = false
	@State() forceHidingOfValidationState: boolean = false

	/**
	 * Enables `cmInput` Events being emitted when the checked attribute changes.
	 */
	@Prop({ reflect: true, mutable: true }) enableAttributeEmit: boolean = false

	@Watch('checked')
	checkedChangeHandler() {
		if (this.enableAttributeEmit) {
			this.resetValidationForces()
			this.cmInput.emit({ isChecked: this.checked, triggeredBy: 'API' })

			if (this.validationResult && !this.validationResult.isValid) {
				this.checkValidity()
			}
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
			this.resetValidationForces()
			this.cmInput.emit({
				isChecked: this.checked,
				triggeredBy: options.triggeredBy ?? 'API',
			})

			if (this.validationResult && !this.validationResult.isValid) {
				this.checkValidity()
			}
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
				this.resetValidationForces()
				this.cmInput.emit({
					isChecked: this.checked,
					triggeredBy: options.triggeredBy ?? 'API',
				})

				if (this.validationResult && !this.validationResult.isValid) {
					this.checkValidity()
				}
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
				this.resetValidationForces()
				this.cmInput.emit({
					isChecked: this.checked,
					triggeredBy: options.triggeredBy ?? 'API',
				})

				if (this.validationResult && !this.validationResult.isValid) {
					this.checkValidity()
				}
			}
		}
	}

	@Method() async reset() {
		this.checked = false
		this.validationResult = undefined
	}

	@Method() async forceFocus() {
		;(
			this.element.shadowRoot.querySelector(
				'.container',
			) as HTMLDivElement
		).focus()

		this.element.scrollIntoView()
	}

	@Method() async checkValidity(): Promise<ValidatorResult> {
		if (!this.required) {
			this.validationResult = { isValid: true }
		} else {
			if (this.checked) {
				this.validationResult = {
					isValid: true,
				}
			} else {
				let validationInput = document.createElement('input')
				validationInput.type = 'checkbox'
				validationInput.required = true

				this.validationResult = {
					isValid: false,
					type: 'invalid',
					message: validationInput.validationMessage,
				}
			}
		}

		return this.validationResult
	}

	@Method() async renderValidity() {
		this.checkValidity()
		this.forceRenderingOfValidationState = true
		this.forceHidingOfValidationState = false
	}

	@Method() async hideValidity() {
		this.forceRenderingOfValidationState = false
		this.forceHidingOfValidationState = true
	}

	resetValidationForces() {
		this.forceHidingOfValidationState = false
		this.forceRenderingOfValidationState = false
	}

	renderErrorMessage() {
		if (!this.forceHidingOfValidationState) {
			if (this.validationResult?.isValid === false) {
				return (
					<div class="errorMessage">
						<cm-icon color="danger" icon="warning"></cm-icon>
						{this.validationResult.message}
					</div>
				)
			} else {
				return <div class="errorMessage"></div>
			}
		} else {
			return <div class="errorMessage"></div>
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
					class={{
						container: true,
						disabled: this.disabled,
						hasError:
							this.validationResult &&
							!this.validationResult.isValid &&
							!this.forceHidingOfValidationState,
					}}
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
					<cm-text appearance="helperText" color="subtle">
						{this.helperText}
					</cm-text>
					{this.renderErrorMessage()}
				</div>
			</Host>
		)
	}
}
