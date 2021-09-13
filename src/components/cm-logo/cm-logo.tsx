import { Component, Host, h, State } from '@stencil/core'
import { onThemeChange, Theme } from '../../globalHelpers'

@Component({
	tag: 'cm-logo',
	styleUrl: 'cm-logo.scss',
	shadow: true,
})
export class CmLogo {
	@State() theme: Theme = 'Light'

	componentWillLoad() {
		onThemeChange((theme) => {
			this.theme = theme
		})
	}

	render() {
		return (
			<Host>
				<div class={{ logo: true, [this.theme]: true }}></div>
			</Host>
		)
	}
}
