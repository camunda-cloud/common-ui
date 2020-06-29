import { Component, h, Prop, Host } from '@stencil/core'

@Component({
	tag: 'cm-datalist',
	styleUrl: 'cm-datalist.scss',
	shadow: true,
})
export class CmDatalist {
	@Prop() headline: string = ''

	render() {
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
