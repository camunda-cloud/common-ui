import { Component, Host, h, Prop } from '@stencil/core'

@Component({
	tag: 'cm-checkbox-group',
	styleUrl: 'cm-checkbox-group.scss',
	shadow: true,
})
export class CmCheckboxGroup {
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
