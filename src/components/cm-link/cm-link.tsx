import { Component, ComponentInterface, Host, h, Prop } from '@stencil/core'

@Component({
	tag: 'cm-link',
	styleUrl: 'cm-link.scss',
	shadow: true,
})
export class CmLink implements ComponentInterface {
	@Prop() href: string = ''
	@Prop() label: string = ''
	@Prop() openIn: 'sameTab' | 'newTab' = 'newTab'

	render() {
		let target = ''

		if (this.openIn === 'newTab') {
			target = '_blank'
		}

		return (
			<Host>
				<a target={target} href={this.href}>
					{this.label}
				</a>
			</Host>
		)
	}
}
