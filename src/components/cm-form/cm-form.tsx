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
import { CmCheckbox } from '../cm-checkbox/cm-checkbox'
import { CmRadiobuttonGroup } from '../cm-radiobutton-group/cm-radiobutton-group'
import { CmSelect } from '../cm-select/cm-select'
import { CmTextfield } from '../cm-textfield/cm-textfield'

@Component({
	tag: 'cm-form',
	styleUrl: 'cm-form.scss',
	shadow: true,
})
export class CmForm {
	@Element() element: HTMLFormElement

	@Event() cmSubmit: EventEmitter<{
		data: Record<string, string | CmSelect['selectedOptions'] | boolean>
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

		const children: Array<
			| HTMLCmTextfieldElement
			| HTMLCmCheckboxElement
			| HTMLCmRadiobuttonGroupElement
			| HTMLCmSelectElement
		> = Array.from(
			this.element.querySelectorAll(
				'cm-textfield, cm-checkbox, cm-radiobutton-group, cm-select',
			),
		) as any

		for (let child of children) {
			if (
				child.nodeName === 'CM-TEXTFIELD' ||
				child.nodeName === 'CM-CHECKBOX' ||
				child.nodeName === 'CM-SELECT'
			) {
				const filteredChild: CmTextfield | CmCheckbox | CmSelect =
					child as any
				let validationResult = await filteredChild.checkValidity()

				if (!validationResult.isValid) {
					if (isFormValid) {
						filteredChild.renderValidity()
						filteredChild.forceFocus()
						isFormValid = false
					} else {
						filteredChild.hideValidity()
					}
				} else {
					if (filteredChild.formName !== '') {
						if (child.nodeName === 'CM-TEXTFIELD') {
							formData[child.formName] = (
								child as any as CmTextfield
							).value
						} else if (child.nodeName === 'CM-CHECKBOX') {
							formData[child.formName] = (
								child as any as CmCheckbox
							).checked
						} else if (child.nodeName === 'CM-SELECT') {
							formData[child.formName] = (
								child as any as CmSelect
							).selectedOptions
						}
					}
				}
			} else if (child.nodeName === 'CM-RADIOBUTTON-GROUP') {
				if (child.formName !== '') {
					formData[child.formName] = (
						child as any as CmRadiobuttonGroup
					).value
				}
			}
		}

		let result:
			| {
					isValid: true
					data: Record<string, string | CmSelect['selectedOptions']>
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
