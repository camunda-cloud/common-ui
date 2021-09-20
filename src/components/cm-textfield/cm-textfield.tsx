import { Component, Host, h, Prop, Method, State, Element } from '@stencil/core'
import { onThemeChange, Theme, ValidatorResult } from '../../globalHelpers'
import { CmIcon } from '../cm-icon/cm-icon'

export type InputType = 'text' | 'multiline' | 'email' | 'password'

export type FieldPrefix =
	| { type: 'text'; value: string }
	| { type: 'icon'; icon: CmIcon['icon'] }
	| { type: 'default' }

export type FieldSuffix =
	| { type: 'text'; value: string }
	| { type: 'icon'; icon: CmIcon['icon'] }
	| { type: 'maxlength' }
	| { type: 'copy' }
	| { type: 'default' }

@Component({
	tag: 'cm-textfield',
	styleUrl: 'cm-textfield.scss',
	shadow: true,
})
export class CmTextfield {
	@Element() element: HTMLCmTextfieldElement

	@Prop({ mutable: true, reflect: true }) type: InputType = 'text'

	@Prop({ mutable: true, reflect: false }) value: string = ''

	@Prop({ mutable: true, reflect: true }) label: string = ''
	@Prop({ mutable: true, reflect: true }) helperText: string = ''
	@Prop({ mutable: true, reflect: true }) showRequired: boolean = false

	@Prop({ mutable: true, reflect: true }) placeholder: string = ''

	@Prop({ mutable: true, reflect: false })
	autocomplete: HTMLInputElement['autocomplete'] = ''

	@Prop({ mutable: true, reflect: false }) disabled: boolean = false
	@Prop({ mutable: true, reflect: false, attribute: 'maxlength' }) maxLength:
		| number
		| undefined = undefined

	@Prop({ mutable: true, reflect: false }) fieldPrefix: FieldPrefix = {
		type: 'default',
	}
	@Prop({ mutable: true, reflect: false }) fieldSuffix: FieldSuffix = {
		type: 'default',
	}

	@Prop({ mutable: true, reflect: false }) required: boolean = false
	@Prop({ mutable: true, reflect: false }) validation:
		| { type: 'default' }
		| {
				type: 'custom'
				validator: (value: string) => Promise<ValidatorResult>
		  } = {
		type: 'default',
	}
	@Prop({ mutable: true, reflect: false }) validationStyle:
		| 'form'
		| 'live'
		| 'delay' = 'form'
	@Prop({ mutable: true, reflect: true }) formName: string = ''

	@Prop({ mutable: true, reflect: true }) labelAlignment:
		| 'horizontal'
		| 'vertical' = 'vertical'

	@State() isDirty: boolean = false
	@State() validationResult: ValidatorResult
	@State() showPassword: boolean = false
	@State() forceRenderingOfValidationState: boolean = false
	@State() forceHidingOfValidationState: boolean = false

	@State() theme: Theme = 'Light'

	@State() showCopyTooltip: boolean = false

	delayedValidationTimer: ReturnType<typeof setTimeout>
	delayValidationDistance = 1000

	componentWillLoad() {
		onThemeChange((theme) => {
			this.theme = theme
		})
	}

	getNormalisedInputType() {
		if (this.type === 'multiline') {
			return 'text'
		} else {
			return this.type
		}
	}

	@Method() async reset() {
		if (!this.disabled) {
			this.value = ''
			this.isDirty = false
			this.validationResult = undefined
		}
	}

	@Method() async forceFocus() {
		;(
			this.element.shadowRoot.querySelector('input, textarea') as
				| HTMLInputElement
				| HTMLTextAreaElement
		).focus()
	}

	@Method() async checkValidity(): Promise<ValidatorResult> {
		let result: ValidatorResult

		if (this.validation.type === 'default') {
			if (this.value === '' && !this.required) {
				result = { isValid: true }
			} else {
				let validationInput = document.createElement('input')
				validationInput.type = this.getNormalisedInputType()
				validationInput.value = this.value
				validationInput.required = this.required
				validationInput.maxLength = this.maxLength

				if (validationInput.checkValidity()) {
					result = {
						isValid: true,
					}
				} else {
					result = {
						isValid: false,
						type: 'invalid',
						message: validationInput.validationMessage,
					}
				}
			}
		} else {
			if (this.required) {
				let validationInput = document.createElement('input')
				validationInput.type = this.getNormalisedInputType()
				validationInput.value = this.value
				validationInput.required = this.required
				validationInput.maxLength = this.maxLength

				if (validationInput.checkValidity()) {
					result = await this.validation.validator(this.value)
				} else {
					result = {
						isValid: false,
						type: 'invalid',
						message: validationInput.validationMessage,
					}
				}
			} else {
				result = await this.validation.validator(this.value)
			}
		}

		return result
	}

	@Method() async renderValidity() {
		this.validationResult = await this.checkValidity()
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

	renderLabelContainer() {
		return (
			<div class="labelContainer">
				<div class="label">{this.label}</div>
				{this.labelAlignment === 'vertical' ? (
					<cm-text appearance="helperText">{this.helperText}</cm-text>
				) : (
					''
				)}

				{this.labelAlignment === 'vertical' && this.showRequired ? (
					<div class="requiredStatus">
						{this.required ? 'Required' : 'Optional'}
					</div>
				) : (
					''
				)}
			</div>
		)
	}

	renderPrefix() {
		if (this.type === 'multiline') {
			return ''
		}

		if (this.fieldPrefix.type === 'text') {
			return <div class="prefix text">{this.fieldPrefix.value}</div>
		} else if (this.fieldPrefix.type === 'icon') {
			return (
				<div class="prefix icon">
					<cm-icon icon={this.fieldPrefix.icon} />
				</div>
			)
		} else if (this.fieldPrefix.type === 'default') {
			if (
				this.type === 'text' ||
				this.type === 'password' ||
				this.type === 'email'
			) {
				return <div class="prefix empty"></div>
			}
		}
	}

	renderInputElement() {
		const inputHandler = async (event) => {
			this.resetValidationForces()
			this.isDirty = true
			this.value = (
				event.target as HTMLTextAreaElement | HTMLInputElement
			).value

			if (this.validationStyle === 'form') {
				if (this.validationResult && !this.validationResult.isValid) {
					this.validationResult = await this.checkValidity()
				}
			} else if (this.validationStyle === 'delay') {
				if (this.delayedValidationTimer) {
					clearTimeout(this.delayedValidationTimer)
				}

				let validity = await this.checkValidity()

				if (validity.isValid === true) {
					this.renderValidity()
				} else if (validity.type === 'incomplete') {
					this.forceHidingOfValidationState = true

					this.delayedValidationTimer = setTimeout(() => {
						this.renderValidity()
					}, this.delayValidationDistance)
				} else {
					this.renderValidity()
				}
			} else {
				this.renderValidity()
			}
		}

		if (this.type === 'multiline') {
			return (
				<textarea
					tabIndex={0}
					disabled={this.disabled}
					value={this.value}
					placeholder={this.placeholder}
					maxlength={this.maxLength}
					onInput={inputHandler}
				/>
			)
		} else {
			let type = this.type

			if (type === 'password' && this.showPassword) {
				type = 'text'
			}

			return (
				<input
					tabIndex={0}
					disabled={this.disabled}
					type={type}
					value={this.value}
					placeholder={this.placeholder}
					maxlength={this.maxLength}
					onInput={inputHandler}
				/>
			)
		}
	}

	renderSuffix() {
		if (this.type === 'multiline') {
			return ''
		}

		if (this.fieldSuffix.type === 'text') {
			return <div class="suffix text">{this.fieldSuffix.value}</div>
		} else if (this.fieldSuffix.type === 'icon') {
			return (
				<div class="suffix icon">
					<cm-icon icon={this.fieldSuffix.icon} />
				</div>
			)
		} else if (this.fieldSuffix.type === 'maxlength') {
			return (
				<div class="suffix maxlength">
					{this.value.length}/{this.maxLength}
				</div>
			)
		} else if (this.fieldSuffix.type === 'copy') {
			return (
				<div class="suffix copy">
					<div
						class={{ tooltip: true, hidden: !this.showCopyTooltip }}
					>
						Copied
					</div>
					<cm-icon
						icon="copy"
						onMouseDown={(event) => {
							event.preventDefault()
						}}
						onClick={(event) => {
							event.preventDefault()

							navigator.clipboard.writeText(this.value).then(
								() => {
									this.showCopyTooltip = true

									setTimeout(() => {
										this.showCopyTooltip = false
									}, 3000)
								},
								() => {
									console.error(
										'Copy to clipboard has failed',
									)
								},
							)
						}}
					></cm-icon>
				</div>
			)
		} else if (this.fieldSuffix.type === 'default') {
			if (this.type === 'text' || this.type === 'email') {
				return <div class="suffix empty"></div>
			} else if (this.type === 'password') {
				if (this.showPassword) {
					return (
						<div class="suffix password">
							<cm-icon
								tab-index="-1"
								icon="hide"
								onMouseDown={(event) => {
									event.preventDefault()
								}}
								onClick={() => {
									this.showPassword = false
								}}
							/>
						</div>
					)
				} else {
					return (
						<div class="suffix password">
							<cm-icon
								style={{ transform: 'translateY(.42px)' }}
								tab-index="-1"
								icon="show"
								onMouseDown={(event) => {
									event.preventDefault()
								}}
								onClick={() => {
									this.showPassword = true
								}}
							/>
						</div>
					)
				}
			}
		}
	}

	renderAsyncStatusIndicator() {
		return <div class="asyncStatusIndicator"></div>
	}

	renderErrorMessage() {
		if (
			(this.isDirty || this.forceRenderingOfValidationState) &&
			!this.forceHidingOfValidationState
		) {
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
		return (
			<Host>
				<label
					class={{
						container: true,
						[this.theme]: true,
						[this.labelAlignment]: true,
						hasError:
							this.validationResult &&
							!this.validationResult.isValid &&
							!this.forceHidingOfValidationState,
						disabled: this.disabled,
					}}
				>
					{this.renderLabelContainer()}
					<div class="inputContainer">
						{this.renderPrefix()}
						{this.renderInputElement()}
						{this.renderAsyncStatusIndicator()}
						{this.renderSuffix()}
					</div>

					{this.renderErrorMessage()}
				</label>
			</Host>
		)
	}
}
