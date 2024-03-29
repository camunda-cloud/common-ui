import { Component, h, Prop, Host, Element } from '@stencil/core'

@Component({
	tag: 'cm-datalist',
	styleUrl: 'cm-datalist.scss',
	shadow: true,
})
export class CmDatalist {
	@Prop({ mutable: true }) headline: string = ''

	/**
	 * Sets the width of the label for all cm-datalist-item's inside this cm-datalist. Expected format is a valid CSS Grid Column value.
	 */
	@Prop({ mutable: true }) labelWidth: string = '250px'

	@Element() element: HTMLCmDatalistElement

	componentDidLoad() {
		this.element.shadowRoot
			.querySelector('slot')
			.addEventListener('slotchange', () => {
				this.updateItemLabelWidth()
			})
	}

	updateItemLabelWidth() {
		let items = Array.from(
			this.element.querySelectorAll('cm-datalist-item'),
		)

		for (let item of items) {
			item.labelWidth = this.labelWidth
		}
	}

	render() {
		this.updateItemLabelWidth()

		return (
			<Host>
				<h1>{this.headline}</h1>
				<div class="items">
					<slot></slot>
				</div>
			</Host>
		)
	}
}
