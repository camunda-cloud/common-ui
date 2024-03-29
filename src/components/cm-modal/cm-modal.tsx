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
import { getContext, transformDataAttributes } from '../../globalHelpers'
import { FormData } from '../cm-form/cm-form'
import { CmSelect } from '../cm-select/cm-select'

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
		| {
				result: 'confirm'
				formData?: FormData
		  }
		| { result: 'cancel' }
	>
	promiseResolver?: (
		value:
			| {
					result: 'confirm'
					formData?: FormData
			  }
			| { result: 'cancel' },
	) => void
	preConfirmationHandler?: (data: { formData?: FormData }) => Promise<void>

	@State() isOpen: boolean = false
	@State() confirmLoading: boolean = false
	@State() cancelDisabled: boolean = false

	componentDidLoad() {
		let context = getContext()

		if (context) {
			context.element.insertAdjacentElement('beforeend', this.element)
		}
	}

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
	@Prop({ mutable: true }) confirmButtonDataAttributes: Record<
		string,
		string
	> = {}

	@Prop({ mutable: true }) cancelLabel: string = ''
	@Prop({ mutable: true }) cancelAppearance: 'secondary' | 'danger' =
		'secondary'
	@Prop({ mutable: true }) cancelButtonDataAttributes: Record<
		string,
		string
	> = {}

	@Prop({ mutable: true }) closeButtonDataAttributes: Record<string, string> =
		{}
	@Prop({ mutable: true }) overrideMaximumWidth: boolean = false

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
			preConfirmationHandler?: (data: {
				formData?: FormData
			}) => Promise<void>
			preventFormReset?: boolean
		} = {},
	): Promise<
		| {
				result: 'confirm'
				formData?: FormData
		  }
		| { result: 'cancel' }
	> {
		this.submitFromConfirm = false
		this.preConfirmationHandler = options.preConfirmationHandler
		this.promise = new Promise<
			| {
					result: 'confirm'
					formData?: FormData
			  }
			| { result: 'cancel' }
		>((resolve) => {
			this.promiseResolver = resolve
		})

		const form = this.element.querySelector('cm-form')
		form?.addEventListener('cmSubmit', () => {
			if (!this.submitFromConfirm) {
				this.confirm()
			}
		})

		if (!options.preventFormReset) {
			form?.reset()
		}

		form?.forceFocus()

		this.isOpen = true

		this.element.focus()

		return this.promise
	}

	/**
	 * Triggers the 'confirm' action on the modal, if it is open.
	 */
	@Method()
	async confirm(): Promise<
		| {
				result: 'confirm'
				formData?: Record<
					string,
					number | string | boolean | CmSelect['selectedOptions']
				>
		  }
		| { result: 'cancel' }
	> {
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
				this.preConfirmationHandler({
					formData: formResult?.data,
				}).then(
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
	async cancel(): Promise<
		| {
				result: 'confirm'
				formData?: Record<
					string,
					number | string | boolean | CmSelect['selectedOptions']
				>
		  }
		| { result: 'cancel' }
	> {
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

		if (this.overrideMaximumWidth) {
			boundedWidth = Math.max(this.width, minimumWidth)
		}

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
								{...transformDataAttributes(
									this.closeButtonDataAttributes,
								)}
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
									{...transformDataAttributes(
										this.cancelButtonDataAttributes,
									)}
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
								{...transformDataAttributes(
									this.confirmButtonDataAttributes,
								)}
							></cm-button>
						</div>
					</div>
				</div>
			</Host>
		)
	}
}
