import { Component, Host, h, Prop } from '@stencil/core'

@Component({
	tag: 'cm-loader',
	styleUrl: 'cm-loader.scss',
	shadow: true,
})
export class CmLoader {
	@Prop({ mutable: true }) size: 'small' | 'normal' = 'normal'

	render() {
		let classes = {
			spinner: true,
			[this.size]: true,
		}

		return (
			<Host>
				<div class={classes}></div>
			</Host>
		)
	}
}
