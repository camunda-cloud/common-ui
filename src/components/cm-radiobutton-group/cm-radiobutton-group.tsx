import { Component, Host, h, Prop, Listen, Element } from '@stencil/core'

@Component({
	tag: 'cm-radiobutton-group',
	styleUrl: 'cm-radiobutton-group.scss',
	shadow: true,
})
export class CmRadiobuttonGroup {
	@Prop({ reflect: false, mutable: false }) defaultValue: string = ''

	@Element() element: HTMLElement

	tabs: Array<HTMLCmRadiobuttonElement> = []

	@Listen('cmSelected')
	radioButtonSelectedHandler(event) {
		for (let tab of this.tabs) {
			if (tab !== event.target) {
				tab.selected = false
			}
		}
	}

	componentDidLoad() {
		this.tabs = Array.from(this.element.querySelectorAll('cm-radiobutton'))

		for (let tab of this.tabs) {
			if (tab.value === this.defaultValue) {
				tab.select()
				break
			}
		}

		const observer = new MutationObserver(() => {
			this.tabs = Array.from(
				this.element.querySelectorAll('cm-radiobutton'),
			)
		})

		observer.observe(this.element, {
			childList: true,
		})
	}

	render() {
		return (
			<Host>
				<slot></slot>
			</Host>
		)
	}
}
