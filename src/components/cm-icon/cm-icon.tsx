import { Component, Host, h, Prop, State } from '@stencil/core'
import { onThemeChange, Theme } from '../../globalHelpers'

@Component({
	tag: 'cm-icon',
	styleUrl: 'cm-icon.scss',
	shadow: true,
})
export class CmIcon {
	@Prop({ mutable: true }) icon:
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

	@State() theme: Theme = 'Light'

	componentWillLoad() {
		onThemeChange((theme) => {
			this.theme = theme
		})
	}

	render() {
		let classes = {
			[this.icon]: true,
			[this.theme]: true,
		}

		return (
			<Host>
				<div class={classes}></div>
			</Host>
		)
	}
}
