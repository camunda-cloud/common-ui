import { Component, Host, h, State } from '@stencil/core'
import { onThemeChange, Theme } from '../../globalHelpers'

/**
 * @slot left - Use this slot to place elements on the left side.
 * @slot right - Use this slot to place elements on the right side.
 */
@Component({
	tag: 'cm-header',
	styleUrl: 'cm-header.scss',
	shadow: true,
})
export class CmHeader {
	@State() theme: Theme = 'Light'

	componentWillLoad() {
		onThemeChange((theme) => {
			this.theme = theme
		})
	}

	render() {
		return (
			<Host>
				<div class={{ header: true, [this.theme]: true }}>
					<div class="left">
						<slot name="left"></slot>
					</div>
					<div class="right">
						<slot name="right"></slot>
					</div>
				</div>
			</Host>
		)
	}
}
