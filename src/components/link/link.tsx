import { Component, ComponentInterface, Host, h, Prop } from '@stencil/core'

@Component({
	tag: 'cm-link',
	styleUrl: 'link.scss',
	shadow: true,
})
export class Link implements ComponentInterface {
	@Prop() href: string = ''
	@Prop() label: string = ''
	@Prop() subtle: boolean = false
	@Prop() openIn: 'sameTab' | 'newTab' = 'newTab'

	render() {
		let className = 'normal'
		let target = ''

		if (this.subtle) {
			className = 'subtle'
		}

		if (this.openIn === 'newTab') {
			target = '_blank'
		}

		return (
			<Host>
				<a target={target} href={this.href} class={className}>
					{this.label}
				</a>
			</Host>
		)
	}
}
