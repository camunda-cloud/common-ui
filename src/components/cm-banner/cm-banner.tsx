import { Component, Host, h, Prop } from '@stencil/core'

/**
 * @slot - The default slot for the content of the Banner.
 */
@Component({
	tag: 'cm-banner',
	styleUrl: 'cm-banner.scss',
	shadow: true,
})
export class CmBanner {
	@Prop({ mutable: true }) appearance: 'warning' = 'warning'

	render() {
		return (
			<Host>
				<div class="container">
					<div>
						<slot></slot>
					</div>
				</div>
			</Host>
		)
	}
}
