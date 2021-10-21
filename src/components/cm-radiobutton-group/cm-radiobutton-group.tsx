import {
	Component,
	Host,
	h,
	Prop,
	Listen,
	Element,
	Watch,
	EventEmitter,
	Event,
} from '@stencil/core'
import { CmRadiobutton } from '../cm-radiobutton/cm-radiobutton'

@Component({
	tag: 'cm-radiobutton-group',
	styleUrl: 'cm-radiobutton-group.scss',
	shadow: true,
})
export class CmRadiobuttonGroup {
	@Prop({ reflect: true, mutable: true }) label: string = ''
	@Prop({ reflect: true, mutable: true }) value: string = ''
	@Prop({ reflect: true, mutable: true }) formName: string = ''

	@Element() element: HTMLElement

	@Event() cmInput: EventEmitter<{ value: string }>

	radiobuttons: Array<HTMLCmRadiobuttonElement> = []

	@Watch('value') setValue(newValue: string) {
		this.selectRadiobutton(newValue)
	}

	@Listen('cmSelected')
	radioButtonSelectedHandler(event) {
		for (let radiobutton of this.radiobuttons) {
			if (radiobutton !== event.target) {
				radiobutton.selected = false
			} else {
				this.value = radiobutton.value
			}
		}

		this.cmInput.emit({ value: this.value })
	}

	selectRadiobutton(
		value: string,
		options?: Parameters<CmRadiobutton['select']>[0],
	) {
		this.radiobuttons = Array.from(
			this.element.querySelectorAll('cm-radiobutton'),
		)

		for (let radiobutton of this.radiobuttons) {
			if (radiobutton.value === value) {
				radiobutton.select(options)
				break
			}
		}
	}

	componentDidLoad() {
		this.selectRadiobutton(this.value, { preventAnimation: true })
	}

	render() {
		return (
			<Host>
				{this.label ? (
					<cm-text id="label" appearance="emphasis">
						{this.label}
					</cm-text>
				) : (
					''
				)}
				<div class="container">
					<slot
						onSlotchange={() => {
							this.selectRadiobutton(this.value, {
								preventAnimation: true,
							})
						}}
					></slot>
				</div>
			</Host>
		)
	}
}
