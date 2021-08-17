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

@Component({
	tag: 'cm-form',
	styleUrl: 'cm-form.scss',
	shadow: true,
})
export class CmForm {
	@Element() element: HTMLFormElement

	@Event() cmSubmit: EventEmitter<{ data: Record<string, string> }>

	@Listen('keyup') keyupHandler(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			this.attemptSubmit()
		}
	}

	@Method() async attemptSubmit() {
		let isFormValid = true
		let formData = {}

		const textFields = Array.from(
			this.element.querySelectorAll('cm-textfield'),
		)

		for (let textField of textFields) {
			let validationResult = await textField.checkValidity()

			if (!validationResult.isValid) {
				if (isFormValid) {
					textField.renderValidity()
					textField.forceFocus()
					isFormValid = false
				} else {
					textField.hideValidity()
				}
			} else {
				if (textField.formName !== '') {
					formData[textField.formName] = textField.value
				}
			}
		}

		const checkboxes = Array.from(
			this.element.querySelectorAll('cm-checkbox'),
		)

		for (let checkbox of checkboxes) {
			let validationResult = await checkbox.checkValidity()

			if (!validationResult.isValid) {
				if (isFormValid) {
					checkbox.renderValidity()
					checkbox.forceFocus()
					isFormValid = false
				} else {
					checkbox.hideValidity()
				}
			} else {
				if (checkbox.formName !== '') {
					formData[checkbox.formName] = checkbox.checked
				}
			}
		}

		const radiobuttonGroups = Array.from(
			this.element.querySelectorAll('cm-radiobutton-group'),
		)

		for (let radiobuttonGroup of radiobuttonGroups) {
			if (radiobuttonGroup.formName !== '') {
				formData[radiobuttonGroup.formName] = radiobuttonGroup.value
			}
		}

		let result:
			| { isValid: true; data: Record<string, string> }
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
	}

	@Method() async forceFocus() {
		;(
			this.element.querySelector(
				'cm-textfield:not([disabled]), cm-checkbox:not([disabled])',
			) as HTMLCmTextfieldElement | HTMLCmCheckboxElement | undefined
		)?.forceFocus()
	}

	render() {
		return (
			<Host>
				<slot></slot>
			</Host>
		)
	}
}
