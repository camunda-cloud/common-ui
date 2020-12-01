import { Component, Host, h } from '@stencil/core'

@Component({
	tag: 'cm-banner',
	styleUrl: 'cm-banner.scss',
	shadow: true,
})
export class CmBanner {
	render() {
		return (
			<Host>
				<div class="container">
					<slot></slot>
				</div>
			</Host>
		)
	}
}
