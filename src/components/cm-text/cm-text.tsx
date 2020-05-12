import { Component, Host, h } from '@stencil/core'

/**
 * @slot - Content is placed in the Content-Area of the card if provided without a slot.
 */
@Component({
	tag: 'cm-text',
	styleUrl: 'cm-text.scss',
	shadow: true,
})
export class CmText {
	render() {
		return (
			<Host>
				<span>
					<slot></slot>
				</span>
			</Host>
		)
	}
}
