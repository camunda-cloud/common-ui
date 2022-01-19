import {
	Component,
	Host,
	h,
	Prop,
	Element,
	Method,
	State,
	Event,
	EventEmitter,
} from '@stencil/core'
import {
	getContext,
	onThemeChange,
	Theme,
	ValidatorResult,
} from '../../globalHelpers'
import { CmIcon } from '../cm-icon/cm-icon'

export type OptionGroup = {
	label?: string
	options: Array<Option>
}

export type Option = {
	label: string
	description?: string
	value: string
}

@Component({
	tag: 'cm-select',
	styleUrl: 'cm-select.scss',
	shadow: true,
})
export class CmSelect {
	@Element() element: HTMLCmTextfieldElement

	@Prop({ mutable: true, reflect: false }) options: Array<OptionGroup> = []
	@Prop({ mutable: true, reflect: false }) allowMultiple: boolean = false
	@Prop({ mutable: true, reflect: false }) preventVerticalExpansion: boolean =
		false

	@Prop({ mutable: true, reflect: true }) label: string = ''
	@Prop({ mutable: true, reflect: true }) helperText: string = ''
	@Prop({ mutable: true, reflect: true }) showRequired: boolean = false

	@Prop({ mutable: true, reflect: true }) placeholder: string = ''

	@Prop({ mutable: true, reflect: false }) disabled: boolean = false

	@Prop({ mutable: true, reflect: false }) fieldPrefix:
		| {
				type: 'icon'
				icon: CmIcon['icon']
		  }
		| { type: 'default' } = {
		type: 'default',
	}

	@Prop({ mutable: true, reflect: false }) required: boolean = false
	@Prop({ mutable: true, reflect: false }) validation:
		| { type: 'default' }
		| {
				type: 'custom'
				validator: (
					selectedOptions: CmSelect['selectedOptions'],
				) => Promise<ValidatorResult>
		  } = {
		type: 'default',
	}
	@Prop({ mutable: true, reflect: false }) validationStyle: 'form' | 'live' =
		'form'
	@Prop({ mutable: true, reflect: true }) formName: string = ''

	@Prop({ mutable: true, reflect: true }) labelAlignment:
		| 'horizontal'
		| 'vertical' = 'vertical'

	@Prop({ mutable: true, reflect: false }) selectedOptions: Array<string> = []

	@State() isOpen: boolean = false
	@State() isDirty: boolean = false
	@State() validationResult: ValidatorResult
	@State() forceRenderingOfValidationState: boolean = false
	@State() forceHidingOfValidationState: boolean = false

	@State() theme: Theme = 'Light'
	@State() flyout: HTMLCmSelectFlyoutElement

	@Event() cmInput: EventEmitter<{ selectedOptions: Array<string> }>
	@Event() cmReset: EventEmitter<void>

	componentWillLoad() {
		onThemeChange((theme) => {
			const shadowRoot = this.element.shadowRoot

			const div = shadowRoot.querySelector('.valueLabelContainer')

			if (div !== null) {
				div.classList.add('appearanceChange')

				requestAnimationFrame(() => {
					div.classList.remove('appearanceChange')
				})
			}

			this.theme = theme
		})

		this.flyout = document.createElement('cm-select-flyout')
		this.flyout.select = this
		this.flyout.addEventListener('cmInput', () => {
			this.cmInput.emit({ selectedOptions: this.selectedOptions })
		})
	}

	componentDidLoad() {
		getContext()?.element.appendChild(this.flyout as any)
	}

	@Method() async reset() {
		if (!this.disabled) {
			this.selectedOptions = []
			this.isDirty = false
			this.validationResult = undefined
			this.cmReset.emit()
		}
	}

	@Method() async forceFocus() {
		;(
			this.element.shadowRoot.querySelector(
				'.valueLabelContainer',
			) as HTMLDivElement
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

		if (!this.required || this.selectedOptions.length) {
			result = { isValid: true }
		} else {
			result = {
				isValid: false,
				type: 'invalid',
				message: 'Please select an option.',
			}
		}

		return result
	}

	@Method() async checkValidity(): Promise<ValidatorResult> {
		let result: ValidatorResult

		result = this.checkDefaultValidity()

		if (this.validation.type !== 'default' && result.isValid) {
			if (!this.required) {
				result = { isValid: true }
			} else {
				result = await this.validation.validator(this.selectedOptions)
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
		if (this.fieldPrefix.type === 'icon') {
			return (
				<div class="prefix icon">
					<cm-icon icon={this.fieldPrefix.icon} />
				</div>
			)
		} else {
			return <div class="prefix empty"></div>
		}
	}

	renderValueLabel() {
		let label = ''

		const reducedOptions = this.options.reduce((prev, curr) => {
			return prev.concat(curr.options)
		}, [])

		let resolvedSelectedOptions = this.selectedOptions.map(
			(selectedOption) => {
				return reducedOptions.find((option) => {
					return option.value === selectedOption
				})
			},
		)

		if (this.allowMultiple) {
			if (this.selectedOptions.length) {
				return (
					<div
						class={{
							valueLabel: true,
							tags: true,
						}}
					>
						{this.preventVerticalExpansion &&
						resolvedSelectedOptions.length > 1 ? (
							<div class="tag">
								{resolvedSelectedOptions.length} selected
								<div
									class="delete"
									onClick={(event) => {
										event.stopPropagation()
										this.selectedOptions = []
									}}
								>
									<cm-icon
										icon="closeSmall"
										color="bright"
										ignoreTheme
									></cm-icon>
								</div>
							</div>
						) : (
							resolvedSelectedOptions.map((option) => {
								return (
									<div class="tag">
										{option.label}
										<div
											class="delete"
											onClick={(event) => {
												event.stopPropagation()
												const elementIndex =
													this.selectedOptions.indexOf(
														option.value,
													)

												this.selectedOptions = [
													...this.selectedOptions.slice(
														0,
														elementIndex,
													),
													...this.selectedOptions.slice(
														elementIndex + 1,
													),
												]
											}}
										>
											<cm-icon
												icon="closeSmall"
												color="bright"
												ignoreTheme
											></cm-icon>
										</div>
									</div>
								)
							})
						)}
					</div>
				)
			} else if (this.placeholder) {
				return (
					<div class="valueLabel placeholder text">
						{this.placeholder}
					</div>
				)
			} else {
				return <div class="valueLabel"></div>
			}
		} else {
			if (this.selectedOptions.length === 1) {
				label = reducedOptions.find((option) => {
					return option.value === this.selectedOptions[0]
				}).label
			}

			if (label) {
				return <div class="valueLabel text">{label}</div>
			} else if (this.placeholder) {
				return (
					<div class="valueLabel placeholder text">
						{this.placeholder}
					</div>
				)
			} else {
				return <div class="valueLabel"></div>
			}
		}
	}

	renderSuffix() {
		let icon

		if (this.isOpen) {
			icon = <cm-icon icon="up"></cm-icon>
		} else {
			icon = <cm-icon icon="down"></cm-icon>
		}

		if (
			this.allowMultiple &&
			this.selectedOptions.length > 1 &&
			!this.preventVerticalExpansion
		) {
			return (
				<div class="suffix clear">
					<div
						class="clear"
						onClick={(event) => {
							event.stopPropagation()
							this.selectedOptions = []
						}}
					>
						<cm-icon
							icon="closeSmall"
							color="bright"
							ignoreTheme
						></cm-icon>
					</div>
					<div class="icon">{icon}</div>
				</div>
			)
		} else {
			return <div class="suffix icon">{icon}</div>
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
		this.flyout.isOpen = this.isOpen
		this.flyout.options = this.options
		this.flyout.selectedOptions = this.selectedOptions

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
						isOpen: this.isOpen,
					}}
					onClick={() => {
						if (!this.disabled) {
							;(
								this.element.shadowRoot.querySelector(
									'.valueLabelContainer',
								) as HTMLDivElement
							).focus()
						}
					}}
				>
					{this.renderLabelContainer()}
					<div
						tabindex={this.disabled ? -1 : 0}
						class={{
							valueLabelContainer: true,
							isOpen: this.isOpen,
						}}
						onClick={() => {
							if (!this.disabled) {
								this.isOpen = !this.isOpen
							}
						}}
					>
						{this.renderPrefix()}
						{this.renderValueLabel()}
						{this.renderSuffix()}
					</div>

					{this.renderErrorMessage()}
				</label>
			</Host>
		)
	}
}
