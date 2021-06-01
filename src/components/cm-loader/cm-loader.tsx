import { Component, Host, h, Prop } from '@stencil/core'

@Component({
	tag: 'cm-loader',
	styleUrl: 'cm-loader.scss',
	shadow: true,
})
export class CmLoader {
	@Prop({ mutable: true }) size: 'small' | 'normal' = 'normal'
	@Prop({ mutable: true }) color: 'dark' | 'light' = 'dark'

	render() {
		let classes = {
			spinner: true,
			[this.size]: true,
			[this.color]: true,
		}

		return (
			<Host>
				<div class={classes}></div>
			</Host>
		)
	}
}
