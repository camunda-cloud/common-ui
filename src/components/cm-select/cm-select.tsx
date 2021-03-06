import {
	Component,
	Host,
	h,
	Prop,
	Event,
	EventEmitter,
	Listen,
	Element,
} from '@stencil/core'

@Component({
	tag: 'cm-select',
	styleUrl: 'cm-select.scss',
	shadow: true,
})
export class CmSelect {
	@Prop() disabled: boolean = false
	@Prop({ attribute: 'options' }) options: Array<{
		label: string
		value: string
	}> = []

	@Element() element: HTMLElement
	@Event() cmInput: EventEmitter<{ newValue: string }>

	@Listen('input')
	inputHandler() {
		let select = this.element.shadowRoot.querySelector('select')
		this.cmInput.emit({
			newValue: select.options[select.selectedIndex].value,
		})
	}

	render() {
		let classes = {
			disabled: this.disabled,
		}

		let renderedOptions = []

		for (let option of this.options) {
			renderedOptions.push(
				<option value={option.value}>{option.label}</option>,
			)
		}

		return (
			<Host>
				<div class={classes}>
					<select>{renderedOptions}</select>
				</div>
			</Host>
		)
	}
}
