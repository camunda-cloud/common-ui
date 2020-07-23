import { Component, Host, h, Prop } from '@stencil/core'

@Component({
	tag: 'cm-icon',
	styleUrl: 'cm-icon.scss',
	shadow: true,
})
export class CmIcon {
	@Prop() icon:
		| 'contextMenu'
		| 'close'
		| 'closeLarge'
		| 'search'
		| 'help'
		| 'information'
		| 'sort'
		| 'plus'
		| 'minus'
		| 'copy'
		| 'show'
		| 'hide'
		| 'edit'
		| 'delete'
		| 'up'
		| 'down'
		| 'left'
		| 'right'

	render() {
		let classes = {
			[this.icon]: true,
		}

		return (
			<Host>
				<div class={classes}></div>
			</Host>
		)
	}
}
