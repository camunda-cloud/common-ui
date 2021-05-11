import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core'

@Component({
	tag: 'cm-card',
	styleUrl: 'cm-card.scss',
	shadow: true,
})
export class CmCard {
	@Prop({ mutable: true }) isDismissable: boolean = false

	@Event() cmDismissed: EventEmitter<{}>

	render() {
		return (
			<Host>
				<div class="container">
					<slot name="header"></slot>
					<div>
						<slot></slot>
					</div>
					<slot name="footer"></slot>

					{this.isDismissable ? (
						<cm-icon-button
							id="dismissButton"
							icon="closeLarge"
							onCmPress={() => {
								this.cmDismissed.emit()
							}}
						></cm-icon-button>
					) : (
						''
					)}
				</div>
			</Host>
		)
	}
}
