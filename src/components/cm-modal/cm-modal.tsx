import {
	Component,
	Host,
	h,
	Prop,
	Method,
	State,
	Element,
	Listen,
} from '@stencil/core'

/**
 * @slot - The default slot for the content of the Modal.
 * @slot cancel - Use this slot with a cm-button to provide an additional way of cancelling out of the modal
 * @slot confirm - Use this slot with a cm-button to provie a way of closing the modal with the Promise resolving to "confirm"
 */

@Component({
	tag: 'cm-modal',
	styleUrl: 'cm-modal.scss',
	shadow: true,
})
export class CmModal {
	promise: Promise<'confirm' | 'cancel'> | undefined
	promiseResolver: ((value: 'confirm' | 'cancel') => void) | undefined

	@State() isOpen: boolean = false
	@Prop({ mutable: true }) headline: string = ''
	@Prop({ mutable: true }) position: 'top' | 'center' = 'center'
	@Element() el: HTMLElement

	@Listen('keydown')
	handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			this.cancel()
		}
	}

	/**
	 * Opens the modal.
	 */
	@Method()
	async open() {
		this.promise = new Promise<'confirm' | 'cancel'>((resolve) => {
			this.promiseResolver = resolve
		})

		this.isOpen = true

		this.el.focus()

		return this.promise
	}

	/**
	 * Triggers the 'confirm' action on the modal, if it is open.
	 */
	@Method()
	async confirm() {
		if (this.isOpen) {
			this.isOpen = false
			this.promiseResolver('confirm')
			return this.promise
		}
	}

	/**
	 * Triggers the 'cancel' action on the modal, if it is open.
	 */
	@Method()
	async cancel() {
		if (this.isOpen) {
			this.isOpen = false
			this.promiseResolver('cancel')
			return this.promise
		}
	}

	componentDidLoad() {
		let cancelSlot = this.el.shadowRoot.querySelector("slot[name='cancel']")
		let confirmSlot = this.el.shadowRoot.querySelector(
			"slot[name='confirm']",
		)

		cancelSlot.addEventListener('cmPress', () => {
			this.cancel()
		})

		confirmSlot.addEventListener('cmPress', () => {
			this.confirm()
		})
	}

	render() {
		let classes = {
			container: true,
			open: this.isOpen,
			[this.position]: true,
		}

		return (
			<Host tabindex="0">
				<div class={classes}>
					<div class="window">
						<div class="header">
							<h1>{this.headline}</h1>
							<cm-icon-button
								icon="closeLarge"
								onCmPress={() => this.cancel()}
							/>
						</div>
						<div class="content">
							<slot></slot>
						</div>
						<div class="buttons">
							<slot name="cancel"></slot>
							<slot name="confirm"></slot>
						</div>
					</div>
				</div>
			</Host>
		)
	}
}
