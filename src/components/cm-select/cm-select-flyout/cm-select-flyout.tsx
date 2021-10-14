import {
	Component,
	Host,
	h,
	Prop,
	State,
	Element,
	Listen,
	Fragment,
} from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import { Theme } from '../../../globalHelpers'
import { CmSelect, Option } from '../cm-select'

@Component({
	tag: 'cm-select-flyout',
	styleUrl: 'cm-select-flyout.scss',
	shadow: true,
})
export class CmSelectFlyout {
	@Element() element!: HTMLStencilElement

	@Prop({ mutable: false, reflect: false }) select: CmSelect

	@Prop({ mutable: true, reflect: false }) options: Array<Option> = []
	@Prop({ mutable: false, reflect: false }) isOpen: boolean

	@State() theme: Theme = 'Light'

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
						return (
							<div
								class="option"
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
		if (this.select) {
			const valueLabelContainer =
				this.select.element.shadowRoot.querySelector(
					'.valueLabelContainer',
				)
			const boundingRectangle =
				valueLabelContainer.getBoundingClientRect()

			this.element.style.position = `absolute`
			this.element.style.left = `${boundingRectangle.left}px`
			this.element.style.top = `${boundingRectangle.top}px`
			this.element.style.width = `${boundingRectangle.width}px`
		}

		if (this.isOpen) {
			;(
				this.element.shadowRoot.querySelector(
					'.valueLabelContainer',
				) as HTMLDivElement
			).focus()
		}
	}

	render() {
		let valueLabel

		if (this.select) {
			valueLabel = (
				<Fragment>
					{this.select.renderPrefix()}
					{this.select.renderValueLabel()}
					{this.select.renderSuffix()}
				</Fragment>
			)
		}

		return (
			<Host>
				<div
					tabindex="0"
					class={{
						valueLabelContainer: true,
						isOpen: this.isOpen,
					}}
				>
					{valueLabel}
					{this.renderFlyout()}
				</div>
			</Host>
		)
	}
}
