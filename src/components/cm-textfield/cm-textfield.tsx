import {
	Component,
	Host,
	h,
	Prop,
	Method,
	State,
	Element,
	Event,
	EventEmitter,
} from '@stencil/core'
import {
	debounce,
	onThemeChange,
	Theme,
	ValidatorResult,
} from '../../globalHelpers'
import { CmIcon } from '../cm-icon/cm-icon'

export type InputType = 'text' | 'multiline' | 'email' | 'password' | 'number'

export type FieldPrefix =
	| { type: 'text'; value: string }
	| {
			type: 'icon'
			icon: CmIcon['icon']
			press?: () => void
			tooltip?: string
	  }
	| { type: 'default' }

export type FieldSuffix =
	| { type: 'text'; value: string }
	| {
			type: 'icon'
			icon: CmIcon['icon']
			press?: () => void
			tooltip?: string
	  }
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
	@Prop({ mutable: true, reflect: false }) valueAsNumber: number = NaN

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
	@Prop({ mutable: true, reflect: false }) min: number | undefined = undefined
	@Prop({ mutable: true, reflect: false }) max: number | undefined = undefined
	@Prop({ mutable: true, reflect: false }) step: number | undefined =
		undefined

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
				ignoreDefaultValidation?: true
		  } = {
		type: 'default',
	}
	@Prop({ mutable: true, reflect: false }) validationStyle:
		| 'form'
		| 'live'
		| 'delay'
		| 'async' = 'form'
	@Prop({ mutable: true, reflect: true }) formName: string = ''

	@Prop({ mutable: true, reflect: true }) labelAlignment:
		| 'horizontal'
		| 'vertical' = 'vertical'

	@Prop({ mutable: true, reflect: false }) rows: number = 2

	@State() isDirty: boolean = false
	@State() validationResult: ValidatorResult
	@State() showPassword: boolean = false
	@State() forceRenderingOfValidationState: boolean = false
	@State() forceHidingOfValidationState: boolean = false

	@State() theme: Theme = 'Light'

	@State() showCopyTooltip: boolean = false
	@State() indicateOngoingValidation: boolean = false

	delayedValidationTimer: ReturnType<typeof setTimeout>
	delayValidationDistance = 1000
	ongoingValidation: Promise<ValidatorResult>

	@Event() cmInput: EventEmitter<{ value: string; valueAsNumber: number }>
	@Event() cmReset: EventEmitter<void>

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
			this.valueAsNumber = NaN
			this.isDirty = false
			this.validationResult = undefined
			this.cmReset.emit()
		}
	}

	@Method() async forceFocus() {
		;(
			this.element.shadowRoot.querySelector('input, textarea') as
				| HTMLInputElement
				| HTMLTextAreaElement
		).focus({ preventScroll: true })

		requestAnimationFrame(() => {
			this.element.scrollIntoView({
				block: 'nearest',
				inline: 'nearest',
				behavior: 'smooth',
			})
		})
	}

	checkDefaultValidity() {
		let result: ValidatorResult

		if (this.value === '' && !this.required) {
			result = { isValid: true }
		} else {
			let validationInput = document.createElement('input')
			validationInput.type = this.getNormalisedInputType()
			validationInput.required = this.required
			validationInput.maxLength = this.maxLength

			if (this.min !== undefined) {
				validationInput.min = this.min.toString()
			}

			if (this.max !== undefined) {
				validationInput.max = this.max.toString()
			}

			if (this.step !== undefined) {
				validationInput.step = this.step.toString()
			}

			validationInput.value = this.value

			if (validationInput.checkValidity()) {
				result = {
					isValid: true,
				}
			} else {
				let type: 'invalid' | 'incomplete' = 'invalid'

				if (this.type === 'email') {
					if (
						this.value.lastIndexOf('.') === this.value.length - 1 ||
						!this.value.includes('@') ||
						(this.value.split('@').length === 2 &&
							this.value.lastIndexOf('@') ===
								this.value.length - 1)
					) {
						type = 'incomplete'
					}
				}

				result = {
					isValid: false,
					type,
					message: validationInput.validationMessage,
				}
			}
		}

		return result
	}

	@Method() async checkValidity(): Promise<ValidatorResult> {
		let result: ValidatorResult

		result = this.checkDefaultValidity()
		if (this.validation.type === 'custom') {
			if (this.validation.ignoreDefaultValidation || result.isValid) {
				if (
					this.value === '' &&
					!this.required &&
					!this.validation.ignoreDefaultValidation
				) {
					return { isValid: true }
				}

				this.ongoingValidation = this.validation.validator(this.value)
				result = await this.ongoingValidation
			}
		}

		return result
	}

	@Method() async renderValidity() {
		if (this.validationStyle === 'async') {
			this.indicateOngoingValidation = true
		}

		this.validationResult = await this.checkValidity()
		this.indicateOngoingValidation = false

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

	debouncedValidation = debounce(() => {
		this.renderValidity()
	}, this.delayValidationDistance)

	renderLabelContainer() {
		return (
			<div
				class={{
					labelContainer: true,
					isEmpty:
						this.label.length === 0 &&
						this.helperText.length === 0 &&
						this.showRequired === false,
				}}
			>
				<div class="label">{this.label}</div>
				{this.labelAlignment === 'vertical' ? (
					<cm-text
						class="helperText"
						appearance="helperText"
						color="subtle"
					>
						{this.helperText}
					</cm-text>
				) : (
					''
				)}

				{this.labelAlignment === 'vertical' && this.showRequired ? (
					<cm-text
						appearance="helperText"
						color="subtle"
						class="requiredStatus"
					>
						{this.required ? 'Required' : 'Optional'}
					</cm-text>
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
			const prefix = this.fieldPrefix

			return (
				<div class="prefix icon">
					<cm-icon
						title={this.fieldPrefix.tooltip}
						icon={this.fieldPrefix.icon}
						style={{ cursor: prefix.press ? 'pointer' : 'default' }}
						onMouseDown={(event) => {
							event.preventDefault()
						}}
						onClick={(event) => {
							event.preventDefault()
							if (prefix.press) {
								prefix.press()
							}
						}}
					/>
				</div>
			)
		} else if (this.fieldPrefix.type === 'default') {
			if (
				this.type === 'text' ||
				this.type === 'password' ||
				this.type === 'email' ||
				this.type === 'number'
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

			if (this.type !== 'multiline') {
				this.valueAsNumber = (
					event.target as HTMLInputElement
				).valueAsNumber
			}

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
			} else if (this.validationStyle === 'async') {
				this.forceHidingOfValidationState = true

				let defaultValidity = await this.checkDefaultValidity()

				if (
					(this.validation.type === 'custom' &&
						this.validation.ignoreDefaultValidation) ||
					defaultValidity.isValid === true
				) {
					this.debouncedValidation()
				} else {
					this.renderValidity()
				}
			} else {
				this.renderValidity()
			}

			this.cmInput.emit({
				value: this.value,
				valueAsNumber: this.valueAsNumber,
			})
		}

		if (this.type === 'multiline') {
			return (
				<textarea
					tabIndex={0}
					rows={this.rows}
					disabled={this.disabled}
					placeholder={this.placeholder}
					maxlength={this.maxLength}
					value={this.value}
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
					placeholder={this.placeholder}
					maxlength={this.maxLength}
					min={this.min}
					max={this.max}
					step={this.step}
					value={this.value}
					onInput={inputHandler}
				/>
			)
		}
	}

	renderAsyncStatusIndicator() {
		if (this.validationStyle === 'async') {
			if (this.indicateOngoingValidation) {
				return (
					<div class="asyncStatusIndicator">
						<cm-loader size="small" />
					</div>
				)
			} else {
				if (
					this.validationResult?.isValid &&
					!this.forceHidingOfValidationState
				) {
					return (
						<div class="asyncStatusIndicator">
							<cm-icon icon="check" color="success" />
						</div>
					)
				} else {
					return <div class="asyncStatusIndicator"></div>
				}
			}
		} else {
			return <div class="asyncStatusIndicator"></div>
		}
	}

	renderSuffix() {
		if (this.type === 'multiline') {
			return ''
		}

		if (this.fieldSuffix.type === 'text') {
			return <div class="suffix text">{this.fieldSuffix.value}</div>
		} else if (this.fieldSuffix.type === 'icon') {
			const suffix = this.fieldSuffix

			return (
				<div class="suffix icon">
					<cm-icon
						title={this.fieldSuffix.tooltip}
						icon={this.fieldSuffix.icon}
						style={{ cursor: suffix.press ? 'pointer' : 'default' }}
						onMouseDown={(event) => {
							event.preventDefault()
						}}
						onClick={(event) => {
							event.preventDefault()
							if (suffix.press) {
								suffix.press()
							}
						}}
					/>
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
			} else if (this.type === 'number') {
				return (
					<div class="suffix number">
						<div
							class="button minus"
							onClick={() => {
								let input =
									this.element.shadowRoot.querySelector(
										'input',
									)

								input.stepDown()
								this.value = input.value
								this.valueAsNumber = input.valueAsNumber

								this.renderValidity()
							}}
						></div>
						<div
							class="button plus"
							onClick={() => {
								let input =
									this.element.shadowRoot.querySelector(
										'input',
									)

								input.stepUp()
								this.value = input.value
								this.valueAsNumber = input.valueAsNumber

								this.renderValidity()
							}}
						></div>
					</div>
				)
			}
		}
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
			<Host
				onBlur={() => {
					if (this.validationStyle === 'delay') {
						this.renderValidity()
					}
				}}
			>
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
