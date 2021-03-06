import { Component, Host, h } from '@stencil/core'

/**
 * @slot left - Use this slot to place elements on the left side.
 * @slot right - Use this slot to place elements on the right side.
 */
@Component({
	tag: 'cm-header',
	styleUrl: 'cm-header.scss',
	shadow: true,
})
export class CmHeader {
	render() {
		return (
			<Host>
				<div class="header">
					<div class="left">
						<slot name="left"></slot>
					</div>
					<div class="right">
						<slot name="right"></slot>
					</div>
				</div>
			</Host>
		)
	}
}
