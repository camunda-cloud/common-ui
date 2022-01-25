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
	State,
} from '@stencil/core'
import { onThemeChange, Theme, reqAnimationFrame } from '../../globalHelpers'

@Component({
	tag: 'cm-radiobutton',
	styleUrl: 'cm-radiobutton.scss',
	shadow: true,
})
export class CmRadiobutton {
	@Prop({ reflect: true, mutable: true }) value: string = ''
	@Prop({ reflect: true, mutable: true }) label: string = ''
	@Prop({ reflect: true, mutable: true }) helperText: string = ''
	@Prop({ mutable: true }) selected: boolean = false
	@Prop({ reflect: true, mutable: true }) disabled: boolean = false

	@Element() element: HTMLElement

	@State() theme: Theme = 'Light'

	componentWillLoad() {
		onThemeChange((theme) => {
			const shadowRoot = this.element.shadowRoot

			const div = shadowRoot.querySelector('.radiobutton')

			if (div !== null) {
				div.classList.add('appearanceChange')

				reqAnimationFrame(() => {
					div.classList.remove('appearanceChange')
				})
			}

			this.theme = theme
		})
	}

	/**
	 * Emitted whenever the selected state changes.
	 */
	@Event() cmSelected: EventEmitter<{
		value: string
		triggeredBy: 'User' | 'API'
	}>

	radiobutton: HTMLDivElement
	isFirstRender = true
	noAnimation = true

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

	componentDidRender() {
		this.isFirstRender = false

		setTimeout(() => {
			this.noAnimation = false
		}, 100)
	}

	/**
	 * Sets the selected state to true. Respects the disabled state, unless forced.
	 */
	@Method()
	async select(
		options: {
			forceSelection?: boolean
			triggeredBy?: 'User' | 'API'
			preventAnimation?: boolean
		} = {},
	) {
		if (!this.disabled || options.forceSelection) {
			if (this.selected === false) {
				if (options.preventAnimation) {
					this.noAnimation = true
				}

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
			[this.theme]: true,
		}

		let radiobuttonClasses = {
			radiobutton: true,
			selected: this.selected,
			disabled: this.disabled,
			noAnimation: this.isFirstRender || this.noAnimation,
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
							empty:
								this.element.querySelectorAll(
									"[slot='beforeLabel']",
								).length === 0,
						}}
					>
						<slot name="beforeLabel"></slot>
					</div>
					<label>{this.label}</label>
					<div
						class={{
							afterLabel: true,
							empty:
								this.element.querySelectorAll(
									"[slot='afterLabel']",
								).length === 0,
						}}
					>
						<slot name="afterLabel"></slot>
					</div>
					<cm-text appearance="helperText" color="subtle">
						{this.helperText}
					</cm-text>
				</div>
			</Host>
		)
	}
}
