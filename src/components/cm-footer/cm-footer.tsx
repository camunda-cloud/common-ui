import { Component, ComponentInterface, Host, h, Prop } from '@stencil/core'

@Component({
	tag: 'cm-footer',
	styleUrl: 'cm-footer.scss',
	shadow: true,
})
export class CmFooter implements ComponentInterface {
	@Prop({ mutable: true }) text: string = ''

	render() {
		return (
			<Host>
				<div class="footer">{this.text}</div>
			</Host>
		)
	}
}
