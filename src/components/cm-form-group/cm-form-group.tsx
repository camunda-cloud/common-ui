import { Component, Host, h, Prop } from '@stencil/core'

@Component({
	tag: 'cm-form-group',
	styleUrl: 'cm-form-group.scss',
	shadow: true,
})
export class CmFormgroup {
	@Prop() label: string = ''

	render() {
		return (
			<Host>
				{this.label ? (
					<cm-text id="label" appearance="emphasis">
						{this.label}
					</cm-text>
				) : (
					''
				)}
				<div class="container">
					<slot></slot>
				</div>
			</Host>
		)
	}
}
