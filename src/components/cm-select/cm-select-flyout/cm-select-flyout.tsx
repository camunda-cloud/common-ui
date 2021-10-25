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
import { Theme } from '../../../globalHelpers'
import { CmSelect, Option } from '../cm-select'

@Component({
	tag: 'cm-select-flyout',
	styleUrl: 'cm-select-flyout.scss',
	shadow: true,
})
export class CmSelectFlyout {
	@Element() element!: HTMLCmSelectFlyoutElement

	@Prop({ mutable: false, reflect: false }) select: CmSelect

	@Prop({ mutable: true, reflect: false }) options: Array<Option> = []
	@Prop({ mutable: false, reflect: false }) isOpen: boolean

	@State() theme: Theme = 'Light'

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
					{this.options.map((option) => {
						const optionIsSelected =
							this.select.selectedOptions.includes(option.value)

						return (
							<div
								class={{
									option: true,
									isSelected: optionIsSelected,
								}}
								onClick={async () => {
									if (
										this.select.selectedOptions.includes(
											option.value,
										)
									) {
										if (this.select.allowMultiple) {
											this.select.selectedOptions.splice(
												this.select.selectedOptions.indexOf(
													option.value,
												),
												1,
											)
											this.cmInput.emit()
										}
									} else {
										if (this.select.allowMultiple) {
											this.select.selectedOptions.push(
												option.value,
											)
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
									this.select.isOpen = false

									if (
										this.select.validationStyle === 'form'
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
								}}
							>
								{option.label}
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
			valueLabelContainer.classList.remove('isOpen')
			this.element.style.height = `0`
		}

		function setupFlyoutUp(element: HTMLElement, maxHeightUp: number) {
			element.style.top = ``
			element.style.bottom = `${
				document.body.clientHeight - maxHeightUp - 20
			}px`
			element.style.maxHeight = `${maxHeightUp}px`
			valueLabelContainer.classList.remove('down')
			valueLabelContainer.classList.add('up')
		}

		function setupFlyoutDown(element: HTMLElement, maxHeightDown: number) {
			element.style.top = `${selectValueContainerBoundingRectangle.top}px`
			element.style.bottom = ``
			element.style.maxHeight = `${maxHeightDown}px`
			valueLabelContainer.classList.add('down')
			valueLabelContainer.classList.remove('up')
		}
	}

	render() {
		let valueLabel

		if (this.select) {
			valueLabel = (
				<div class="labelContainer">
					{this.select.renderPrefix()}
					{this.select.renderValueLabel()}
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
