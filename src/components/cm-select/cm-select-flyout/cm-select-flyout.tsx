import {
	Component,
	Host,
	h,
	Prop,
	State,
	Element,
	Listen,
	Event,
	EventEmitter,
} from '@stencil/core'
import { fuzzysearch, Theme } from '../../../globalHelpers'
import { CmSelect, OptionGroup } from '../cm-select'

@Component({
	tag: 'cm-select-flyout',
	styleUrl: 'cm-select-flyout.scss',
	shadow: true,
})
export class CmSelectFlyout {
	@Element() element!: HTMLCmSelectFlyoutElement

	@Prop({ mutable: false, reflect: false }) select: CmSelect

	@Prop({ mutable: true, reflect: false }) options: Array<OptionGroup> = []
	@Prop({ mutable: true, reflect: false }) selectedOptions: Array<string> = []
	@Prop({ mutable: false, reflect: false }) isOpen: boolean

	@State() search: string = ''
	@State() theme: Theme = 'Light'
	flyoutIsSetup: boolean = false

	@Event() cmInput: EventEmitter<{ value: Array<string> }>

	@Listen('blur') blurHandler() {
		this.select.isOpen = false
	}

	@Listen('wheel') wheelHandler(event) {
		event.stopPropagation()
	}

	componentDidLoad() {
		window.addEventListener('wheel', () => {
			if (this.select) {
				this.select.isOpen = false
			}
		})
	}

	renderFlyout() {
		if (this.isOpen) {
			return (
				<div class="flyout">
					{this.options.map((optionGroup) => {
						return (
							<div class="optionGroup">
								{optionGroup.label ? (
									<div class="optionGroupLabel">
										{optionGroup.label}
									</div>
								) : (
									''
								)}
								{optionGroup.options.map((option) => {
									if (
										this.search.length > 0 &&
										!(
											fuzzysearch(
												this.search,
												option.label,
											) ||
											fuzzysearch(
												this.search,
												option.description,
											)
										)
									) {
										return ''
									}

									const optionIsSelected =
										this.select.selectedOptions.includes(
											option.value,
										)

									if (
										optionIsSelected &&
										this.select.allowMultiple &&
										!this.select.preventVerticalExpansion
									) {
										return ''
									}

									const toggleSelection = async () => {
										if (
											this.select.selectedOptions.includes(
												option.value,
											)
										) {
											if (this.select.allowMultiple) {
												let targetIndex =
													this.select.selectedOptions.indexOf(
														option.value,
													)
												this.select.selectedOptions = [
													...this.select.selectedOptions.slice(
														0,
														targetIndex,
													),
													...this.select.selectedOptions.slice(
														targetIndex + 1,
													),
												]

												this.cmInput.emit()
												this.select.isOpen = true
											}
										} else {
											if (this.select.allowMultiple) {
												this.select.selectedOptions = [
													...this.select
														.selectedOptions,
													option.value,
												]
												this.select.isOpen = true
											} else {
												this.select.selectedOptions = [
													option.value,
												]
												this.select.forceFocus()
											}

											this.cmInput.emit()
										}

										this.select.resetValidationForces()
										this.select.isDirty = true

										if (
											this.select.validationStyle ===
											'form'
										) {
											if (
												this.select.validationResult &&
												!this.select.validationResult
													.isValid
											) {
												this.select.validationResult =
													await this.select.checkValidity()
											}
										} else {
											this.select.renderValidity()
										}
									}

									if (this.select.preventVerticalExpansion) {
										return (
											<div
												class={{
													option: true,
													checkbox: true,
													hasDescription:
														option.description
															?.length > 0,
												}}
												onClick={toggleSelection}
											>
												<cm-checkbox
													checked={optionIsSelected}
													label={option.label}
												/>
												{option.description ? (
													<div class="description">
														{option.description}
													</div>
												) : (
													''
												)}
											</div>
										)
									} else {
										return (
											<div
												class={{
													option: true,
													isSelected:
														optionIsSelected,
													hasDescription:
														option.description
															?.length > 0,
												}}
												onClick={toggleSelection}
											>
												<div class="label">
													{option.label}
												</div>
												{option.description ? (
													<div class="description">
														{option.description}
													</div>
												) : (
													''
												)}
											</div>
										)
									}
								})}
							</div>
						)
					})}
				</div>
			)
		} else {
			return <div class="flyout"></div>
		}
	}

	componentDidRender() {
		let setupFlyoutUp = (element: HTMLElement, maxHeightUp: number) => {
			element.style.top = ``
			element.style.bottom = `${
				document.body.clientHeight - maxHeightUp - 20
			}px`
			element.style.maxHeight = `${maxHeightUp}px`
			valueLabelContainer.classList.remove('down')
			valueLabelContainer.classList.add('up')
			this.flyoutIsSetup = true
		}

		let setupFlyoutDown = (element: HTMLElement, maxHeightDown: number) => {
			element.style.top = `${selectValueContainerBoundingRectangle.top}px`
			element.style.bottom = ``
			element.style.maxHeight = `${maxHeightDown}px`
			valueLabelContainer.classList.add('down')
			valueLabelContainer.classList.remove('up')
			this.flyoutIsSetup = true
		}

		if (this.flyoutIsSetup && this.isOpen) {
			return
		}

		const valueLabelContainer = this.element.shadowRoot.querySelector(
			'.valueLabelContainer',
		)

		const flyout = valueLabelContainer.querySelector('.flyout')

		const selectValueLabelContainer =
			this.select.element.shadowRoot.querySelector('.valueLabelContainer')

		const selectValueContainerBoundingRectangle =
			selectValueLabelContainer.getBoundingClientRect()

		this.element.style.position = `absolute`
		this.element.style.left = `${selectValueContainerBoundingRectangle.left}px`
		this.element.style.width = `${selectValueContainerBoundingRectangle.width}px`

		if (this.isOpen) {
			const maxHeightDown =
				document.body.clientHeight -
				selectValueContainerBoundingRectangle.top -
				20

			const maxHeightUp =
				selectValueContainerBoundingRectangle.top +
				(selectValueLabelContainer.clientHeight + 2) -
				20

			this.element.style.height = `100%`

			valueLabelContainer.classList.add('isOpen')
			valueLabelContainer.classList.add('hidden')

			if (maxHeightDown >= maxHeightUp) {
				setupFlyoutDown(this.element, maxHeightDown)
			} else {
				setupFlyoutUp(this.element, maxHeightUp)
			}

			// The flyout height is only available after we have set the flyout up in either direction
			if (
				flyout.clientHeight <= Math.min(maxHeightUp, maxHeightDown) ||
				Math.abs(maxHeightUp - maxHeightDown) < 100
			) {
				setupFlyoutDown(this.element, maxHeightDown)
			}

			;(
				this.element.shadowRoot.querySelector(
					'.valueLabelContainer',
				) as HTMLDivElement
			).focus()

			this.element.shadowRoot
				.querySelector('.isSelected')
				?.scrollIntoView({ inline: 'center', block: 'center' })

			requestAnimationFrame(() => {
				valueLabelContainer.classList.remove('hidden')
			})
		} else {
			this.flyoutIsSetup = false
			valueLabelContainer.classList.remove('isOpen')
			this.element.style.height = `0`
		}
	}

	render() {
		let valueLabel

		if (this.select) {
			valueLabel = (
				<div
					class="labelContainer"
					onClick={() => {
						this.select.isOpen = false
					}}
				>
					{this.select.renderPrefix()}
					{this.select.renderValueLabel()}
					<input
						type="text"
						onInput={(event: InputEvent) => {
							this.search =
								(event.target as HTMLInputElement).value ?? ''
						}}
					/>
					{this.select.renderSuffix()}
				</div>
			)
		}

		return (
			<Host>
				<div class="container">
					<div
						tabindex="0"
						class={{
							valueLabelContainer: true,
						}}
					>
						{valueLabel}
						{this.renderFlyout()}
					</div>
				</div>
			</Host>
		)
	}
}
