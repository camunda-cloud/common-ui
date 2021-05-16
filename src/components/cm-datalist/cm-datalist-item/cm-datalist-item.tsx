import { Component, h, Prop, Host } from '@stencil/core'

@Component({
	tag: 'cm-datalist-item',
	styleUrl: 'cm-datalist-item.scss',
	shadow: false,
})
export class CmDatalistItem {
	@Prop() labelWidth: string = '250px'
	@Prop() label: string = ''

	render() {
		return (
			<Host>
				<div
					class="container"
					style={{ gridTemplateColumns: `${this.labelWidth} 1fr` }}
				>
					<span class="label">{this.label}</span>
					<div class="content">
						<slot></slot>
					</div>
				</div>
			</Host>
		)
	}
}
