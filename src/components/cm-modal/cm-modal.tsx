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

const minimumWidth = 250
const maximumWidth = 750
@Component({
	tag: 'cm-modal',
	styleUrl: 'cm-modal.scss',
	shadow: true,
})
export class CmModal {
	promise?: Promise<
		| { result: 'confirm'; formData?: Record<string, string> }
		| { result: 'cancel' }
	>
	promiseResolver?: (
		value:
			| { result: 'confirm'; formData?: Record<string, string> }
			| { result: 'cancel' },
	) => void
	preConfirmationHandler?: () => Promise<void>

	@State() isOpen: boolean = false
	@State() confirmLoading: boolean = false
	@State() cancelDisabled: boolean = false

	@Prop({ mutable: true }) position: 'top' | 'center' = 'center'
	@Prop({ mutable: true }) width: number = 636

	@Prop({ mutable: true }) paddings:
		| 'all'
		| 'vertical'
		| 'horizontal'
		| 'none' = 'all'

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

	@Element() element: HTMLElement

	@Listen('keydown')
	handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			this.cancel()
		}
	}

	submitFromConfirm = false

	/**
	 * Opens the modal. Takes an optional handler for asynchronous confirm actions, which only trigger confirm if the returned Promise resolves successfully. While the Promise is unresolved, the Modal stays open and the ConfirmButton is in a loading state.
	 */
	@Method()
	async open(
		options: {
			preConfirmationHandler?: () => Promise<void>
			preventFormReset?: boolean
		} = {},
	) {
		this.submitFromConfirm = false
		this.preConfirmationHandler = options.preConfirmationHandler
		this.promise = new Promise<
			| { result: 'confirm'; formData?: Record<string, string> }
			| { result: 'cancel' }
		>((resolve) => {
			this.promiseResolver = resolve
		})

		if (!options.preventFormReset) {
			const form = this.element.querySelector('cm-form')
			form?.reset()
			form?.addEventListener('cmSubmit', () => {
				if (!this.submitFromConfirm) {
					this.confirm()
				}
			})
			form?.forceFocus()
		}

		this.isOpen = true

		this.element.focus()

		return this.promise
	}

	/**
	 * Triggers the 'confirm' action on the modal, if it is open.
	 */
	@Method()
	async confirm() {
		if (this.isOpen) {
			let form = this.element.querySelector('cm-form')
			let formResult

			if (form) {
				this.submitFromConfirm = true
				formResult = await form.attemptSubmit()
				this.submitFromConfirm = false

				if (!formResult.isValid) {
					return this.promise
				}
			}

			if (this.preConfirmationHandler) {
				this.confirmLoading = true
				this.cancelDisabled = true
				this.preConfirmationHandler().then(
					() => {
						this.isOpen = false
						this.promiseResolver({
							result: 'confirm',
							formData: formResult?.data,
						})

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
				this.promiseResolver({
					result: 'confirm',
					formData: formResult?.data,
				})
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
			this.promiseResolver({ result: 'cancel' })
		}

		return this.promise
	}

	render() {
		let classes = {
			container: true,
			open: this.isOpen,
			[this.position]: true,
		}

		let boundedWidth = Math.max(
			Math.min(this.width, maximumWidth),
			minimumWidth,
		)

		return (
			<Host tabindex="0">
				<div class={classes}>
					<div class="window" style={{ width: `${boundedWidth}px` }}>
						<div class="header">
							<h1>{this.headline}</h1>
							<cm-icon-button
								disabled={this.cancelDisabled}
								icon="closeLarge"
								onCmPress={() => this.cancel()}
							/>
						</div>
						<div
							class={{
								content: true,
								[`paddings-${this.paddings}`]: true,
							}}
						>
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
