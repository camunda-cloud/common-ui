import {
	Component,
	Element,
	Event,
	EventEmitter,
	Listen,
	Method,
	Host,
	h,
} from '@stencil/core'
import { CmSelect } from '../cm-select/cm-select'

export type FormData = Record<
	string,
	number | string | CmSelect['selectedOptions'] | boolean
>

@Component({
	tag: 'cm-form',
	styleUrl: 'cm-form.scss',
	shadow: true,
})
export class CmForm {
	@Element() element: HTMLFormElement

	@Event() cmSubmit: EventEmitter<{
		data: FormData
	}>

	@Listen('keyup') keyupHandler(event: KeyboardEvent) {
		if (
			(event.target as any)?.type !== 'multiline' &&
			event.key === 'Enter'
		) {
			this.attemptSubmit()
		}
	}

	@Method() async attemptSubmit() {
		let isFormValid = true
		let formData = {}

		const children = Array.from(
			this.element.querySelectorAll(
				'cm-textfield, cm-checkbox, cm-radiobutton-group, cm-select',
			),
		) as any

		for (let child of children) {
			if (
				CmForm.isTextfield(child) ||
				CmForm.isCheckbox(child) ||
				CmForm.isSelect(child)
			) {
				let validationResult = await child.checkValidity()

				if (!validationResult.isValid) {
					if (isFormValid) {
						child.renderValidity()
						child.forceFocus()
						isFormValid = false
					} else {
						child.hideValidity()
					}
				} else {
					if (child.formName !== '') {
						if (CmForm.isTextfield(child)) {
							if (child.type === 'number') {
								formData[child.formName] = child.valueAsNumber
							} else {
								formData[child.formName] = child.value
							}
						} else if (CmForm.isCheckbox(child)) {
							formData[child.formName] = child.checked
						} else if (CmForm.isSelect(child)) {
							if (child.allowMultiple) {
								formData[child.formName] = child.selectedOptions
							} else {
								formData[child.formName] =
									child.selectedOptions[0]
							}
						}
					}
				}
			} else if (CmForm.isRadioButtonGroup(child)) {
				if (child.formName !== '') {
					formData[child.formName] = child.value
				}
			}
		}

		let result:
			| {
					isValid: true
					data: FormData
			  }
			| { isValid: false }

		if (isFormValid) {
			this.cmSubmit.emit({ data: formData })
			result = { isValid: true, data: formData }
		} else {
			result = { isValid: false }
		}

		return result
	}

	@Method() async reset() {
		const textFields = Array.from(
			this.element.querySelectorAll('cm-textfield'),
		)

		for (let textField of textFields) {
			textField.reset()
		}

		const checkboxes = Array.from(
			this.element.querySelectorAll('cm-checkbox'),
		)

		for (let checkbox of checkboxes) {
			checkbox.reset()
		}

		const selects = Array.from(this.element.querySelectorAll('cm-select'))

		for (let select of selects) {
			select.reset()
		}
	}

	@Method() async forceFocus() {
		;(
			this.element.querySelector(
				[
					'cm-textfield:not([disabled])',
					'cm-checkbox:not([disabled])',
					'cm-select:not([disabled])',
				].join(','),
			) as
				| HTMLCmTextfieldElement
				| HTMLCmCheckboxElement
				| HTMLCmSelectElement
				| undefined
		)?.forceFocus()
	}

	render() {
		return (
			<Host>
				<slot></slot>
			</Host>
		)
	}

	static isTextfield(
		element: HTMLElement,
	): element is HTMLCmTextfieldElement {
		return element.nodeName === 'CM-TEXTFIELD'
	}

	static isCheckbox(element: HTMLElement): element is HTMLCmCheckboxElement {
		return element.nodeName === 'CM-CHECKBOX'
	}

	static isSelect(element: HTMLElement): element is HTMLCmSelectElement {
		return element.nodeName === 'CM-SELECT'
	}

	static isRadioButtonGroup(
		element: HTMLElement,
	): element is HTMLCmRadiobuttonGroupElement {
		return element.nodeName === 'CM-RADIOBUTTON-GROUP'
	}
}
