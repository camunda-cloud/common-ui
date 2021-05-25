import {
	Component,
	Host,
	h,
	Prop,
	Event,
	EventEmitter,
	Element,
	State,
} from '@stencil/core'

@Component({
	tag: 'cm-card',
	styleUrl: 'cm-card.scss',
	shadow: true,
})
export class CmCard {
	/**
	 * Adds a Dismiss-Button to the Card, which fires the `cmDismissed` Event when pressed.
	 */
	@Prop({ mutable: true }) isDismissable: boolean = false

	@Element() element: HTMLCmCardElement
	@State() hasFooterContent = false

	/**
	 * Emitted when the Card is being dismissed. Has no default action.
	 */
	@Event() cmDismissed: EventEmitter<{}>

	componentDidRender() {
		requestAnimationFrame(() => {
			let footerSlot = this.element.shadowRoot.querySelector(
				'slot[name=footer]',
			) as HTMLSlotElement

			if (footerSlot) {
				this.hasFooterContent = footerSlot.assignedElements().length > 0
			}
		})
	}

	componentDidLoad() {
		let footerSlot = this.element.shadowRoot.querySelector(
			'slot[name=footer]',
		) as HTMLSlotElement

		footerSlot.addEventListener('slotchange', () => {
			this.hasFooterContent = footerSlot.assignedElements().length > 0
		})
	}

	render() {
		const contentClasses = {
			content: true,
			hasFooterContent: this.hasFooterContent,
		}

		return (
			<Host>
				<div class="container">
					<slot name="header"></slot>
					<div class={contentClasses}>
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
