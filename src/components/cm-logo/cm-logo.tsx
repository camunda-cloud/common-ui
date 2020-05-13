import { Component, Host, h } from '@stencil/core'

@Component({
	tag: 'cm-logo',
	styleUrl: 'cm-logo.scss',
	shadow: true,
})
export class CmLogo {
	render() {
		return (
			<Host>
				<div class="logo"></div>
			</Host>
		)
	}
}
