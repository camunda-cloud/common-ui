import { Component, Host, h, Prop } from '@stencil/core'

/**
 * @slot - Content is placed in the Content-Area of the card if provided without a slot.
 */
@Component({
	tag: 'cm-text',
	styleUrl: 'text.scss',
	shadow: true,
})
export class Text {
	@Prop() appearance: 'bold' | 'subtle' | 'normal' = 'normal'

	render() {
		let className = ''

		if (this.appearance === 'bold') {
			className = 'bold'
		} else if (this.appearance === 'subtle') {
			className = 'subtle'
		}

		return (
			<Host>
				<span class={className}>
					<slot></slot>
				</span>
			</Host>
		)
	}
}
