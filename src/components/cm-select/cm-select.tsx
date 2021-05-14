import {
	Component,
	Host,
	h,
	Prop,
	Event,
	EventEmitter,
	Listen,
	Element,
	Method,
} from '@stencil/core'

@Component({
	tag: 'cm-select',
	styleUrl: 'cm-select.scss',
	shadow: true,
})
export class CmSelect {
	@Prop({ mutable: true }) disabled: boolean = false
	@Prop({ attribute: 'options', mutable: true }) options: Array<{
		label: string
		value: string
	}> = []

	/**
	 * Emitted when the selected Option changes.
	 */
	@Event() cmInput: EventEmitter<{ newValue: string }>

	@Element() element: HTMLElement

	/**
	 * Selects an option based on the passed index. Respects the disabled state unless forced.
	 */
	@Method()
	async selectOptionByIndex(options: {
		forceSelection?: boolean
		selectedIndex: number
	}) {
		if (!this.disabled || options.forceSelection) {
			let select = this.element.shadowRoot.querySelector('select')

			select.selectedIndex = options.selectedIndex
		}
	}

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
