import { Component, h, Prop, Host } from '@stencil/core'

@Component({
	tag: 'cm-datalist-item',
	styleUrl: 'cm-datalist-item.scss',
	shadow: false,
})
export class CmDatalistItem {
	@Prop() label: string = ''

	render() {
		return (
			<Host>
				<span class="label">{this.label}</span>
				<div class="content">
					<slot></slot>
				</div>
			</Host>
		)
	}
}
