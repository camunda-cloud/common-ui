import { Component, Host, h, Prop, State } from '@stencil/core'
import { onThemeChange, Theme } from '../../globalHelpers'

/**
 * @slot - The default slot is meant for the text you want to display.
 */
@Component({
	tag: 'cm-text',
	styleUrl: 'cm-text.scss',
	shadow: true,
})
export class CmText {
	@Prop({ mutable: true }) color: 'bright' | 'subtle' = 'bright'
	@Prop({ mutable: true }) appearance:
		| 'normal'
		| 'entityListItem'
		| 'entityListName' = 'normal'

	@State() theme: Theme = 'Light'

	componentWillLoad() {
		onThemeChange((theme) => {
			this.theme = theme
		})
	}

	render() {
		return (
			<Host>
				<span
					class={{
						[this.theme]: true,
						[this.color]: true,
						[this.appearance]: true,
					}}
				>
					<slot></slot>
				</span>
			</Host>
		)
	}
}
