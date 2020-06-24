import { Component, Host, h } from '@stencil/core'

/**
 * @slot - The default slot is meant for the text you want to display.
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
