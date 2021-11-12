import { Component, Host, h, Prop, State } from '@stencil/core'
import { onThemeChange, Theme } from '../../globalHelpers'

@Component({
	tag: 'cm-loader',
	styleUrl: 'cm-loader.scss',
	shadow: true,
})
export class CmLoader {
	@Prop({ mutable: true }) size: 'small' | 'normal' = 'normal'
	@State() theme: Theme = 'Light'

	componentWillLoad() {
		onThemeChange((theme) => {
			this.theme = theme
		})
	}

	render() {
		let classes = {
			spinner: true,
			[this.size]: true,
			[this.theme]: true,
		}

		return (
			<Host>
				<div class={classes}></div>
			</Host>
		)
	}
}
