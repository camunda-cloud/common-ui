import { Component, Host, h, Prop, Listen, Element, Watch } from '@stencil/core'

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
	}

	selectRadiobutton(value: string) {
		this.radiobuttons = Array.from(
			this.element.querySelectorAll('cm-radiobutton'),
		)

		for (let radiobutton of this.radiobuttons) {
			if (radiobutton.value === value) {
				radiobutton.select()
				break
			}
		}
	}

	componentDidLoad() {
		this.selectRadiobutton(this.value)
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
					<slot></slot>
				</div>
			</Host>
		)
	}
}
