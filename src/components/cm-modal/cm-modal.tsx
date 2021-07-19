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
 */

@Component({
	tag: 'cm-modal',
	styleUrl: 'cm-modal.scss',
	shadow: true,
})
export class CmModal {
	promise?: Promise<'confirm' | 'cancel'>
	promiseResolver?: (value: 'confirm' | 'cancel') => void
	preConfirmationHandler?: () => Promise<void>

	@State() isOpen: boolean = false
	@State() confirmLoading: boolean = false
	@State() cancelDisabled: boolean = false

	@Prop({ mutable: true }) position: 'top' | 'center' = 'center'

	@Prop({ mutable: true }) headline: string = ''

	@Prop({ mutable: true }) confirmLabel: string = ''
	@Prop({ mutable: true }) confirmAppearance:
		| 'primary'
		| 'danger'
		| 'secondary' = 'primary'
	@Prop({ mutable: true }) confirmDisabled: boolean = false

	@Prop({ mutable: true }) cancelLabel: string = ''
	@Prop({ mutable: true }) cancelAppearance: 'secondary' | 'danger' =
		'secondary'

	@Element() el: HTMLElement

	@Listen('keydown')
	handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			this.cancel()
		}
	}

	/**
	 * Opens the modal. Takes an optional handler for asynchronous confirm actions, which only trigger confirm if the returned Promise resolves successfully. While the Promise is unresolved, the Modal stays open and the ConfirmButton is in a loading state.
	 */
	@Method()
	async open(preConfirmationHandler?: () => Promise<void>) {
		this.preConfirmationHandler = preConfirmationHandler
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
			if (this.preConfirmationHandler) {
				this.confirmLoading = true
				this.cancelDisabled = true
				this.preConfirmationHandler().then(
					() => {
						this.isOpen = false
						this.promiseResolver('confirm')

						this.confirmLoading = false
						this.cancelDisabled = false
					},
					() => {
						this.confirmLoading = false
						this.cancelDisabled = false
					},
				)
			} else {
				this.isOpen = false
				this.promiseResolver('confirm')
			}
		}

		return this.promise
	}

	/**
	 * Triggers the 'cancel' action on the modal, if it is open.
	 */
	@Method()
	async cancel() {
		if (this.isOpen) {
			this.isOpen = false
			this.promiseResolver('cancel')
		}

		return this.promise
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
								disabled={this.cancelDisabled}
								icon="closeLarge"
								onCmPress={() => this.cancel()}
							/>
						</div>
						<div class="content">
							<slot></slot>
						</div>
						<div class="buttons">
							{this.cancelLabel !== '' ? (
								<cm-button
									disabled={this.cancelDisabled}
									appearance={this.cancelAppearance}
									label={this.cancelLabel}
									onCmPress={() => this.cancel()}
								></cm-button>
							) : (
								''
							)}
							<cm-button
								appearance={this.confirmAppearance}
								label={this.confirmLabel}
								loading={this.confirmLoading}
								disabled={this.confirmDisabled}
								onCmPress={() => this.confirm()}
							></cm-button>
						</div>
					</div>
				</div>
			</Host>
		)
	}
}
