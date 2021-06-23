import {
	Component,
	Host,
	h,
	Prop,
	Listen,
	Event,
	EventEmitter,
	Method,
	Element,
} from '@stencil/core'

@Component({
	tag: 'cm-radiobutton',
	styleUrl: 'cm-radiobutton.scss',
	shadow: true,
})
export class CmRadiobutton {
	@Prop({ reflect: true, mutable: true }) value: string = ''
	@Prop({ reflect: true, mutable: true }) label: string = ''
	@Prop({ mutable: true }) selected: boolean = false
	@Prop({ reflect: true, mutable: true }) disabled: boolean = false

	@Element() element: HTMLElement

	/**
	 * Emitted whenever the selected state changes.
	 */
	@Event() cmSelected: EventEmitter<{
		value: string
		triggeredBy: 'User' | 'API'
	}>

	radiobutton: HTMLDivElement

	@Listen('keydown')
	handleKeyDown(event: KeyboardEvent) {
		if (event.key === ' ') {
			if (!this.disabled) {
				this.select({ triggeredBy: 'User' })
				event.preventDefault()
			}
		}
	}

	@Listen('click')
	handleClick() {
		if (!this.disabled) {
			this.select({ triggeredBy: 'User' })
		}
	}

	/**
	 * Sets the selected state to true. Respects the disabled state, unless forced.
	 */
	@Method()
	async select(
		options: {
			forceSelection?: boolean
			triggeredBy?: 'User' | 'API'
		} = {},
	) {
		if (!this.disabled || options.forceSelection) {
			if (this.selected === false) {
				this.selected = true
				this.cmSelected.emit({
					value: this.value,
					triggeredBy: options.triggeredBy ?? 'API',
				})
			}
		}
	}

	render() {
		let containerClasses = {
			container: true,
			disabled: this.disabled,
		}

		let radiobuttonClasses = {
			radiobutton: true,
			selected: this.selected,
			disabled: this.disabled,
		}

		let tabIndex = 0

		if (this.disabled) {
			tabIndex = -1
		}

		return (
			<Host>
				<div class={containerClasses} tabindex={tabIndex}>
					<div
						class={radiobuttonClasses}
						ref={(element) =>
							(this.radiobutton = element as HTMLDivElement)
						}
						role="radio"
						aria-disabled={this.disabled}
					></div>
					<div
						class={{
							beforeLabel: true,
							empty: !this.element
								.querySelector("[slot='beforeLabel']")
								?.hasChildNodes(),
						}}
					>
						<slot name="beforeLabel"></slot>
					</div>
					<label>{this.label}</label>
					<div
						class={{
							afterLabel: true,
							empty: !this.element
								.querySelector("[slot='afterLabel']")
								?.hasChildNodes(),
						}}
					>
						<slot name="afterLabel"></slot>
					</div>
				</div>
			</Host>
		)
	}
}
