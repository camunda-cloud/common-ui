import {
	Component,
	ComponentInterface,
	Host,
	h,
	Prop,
	EventEmitter,
	Listen,
	Event,
	State,
	Element,
	Method,
	Watch,
} from '@stencil/core'
import {
	onThemeChange,
	Theme,
	ensureRequestAnimationFrame,
} from '../../globalHelpers'

@Component({
	tag: 'cm-button',
	styleUrl: 'cm-button.scss',
	shadow: true,
})
export class CmButton implements ComponentInterface {
	@Prop({ mutable: true }) appearance:
		| 'main'
		| 'primary'
		| 'secondary'
		| 'danger'
		| 'link' = 'main'
	@Prop({ mutable: true }) label: string = ''
	@Prop({ mutable: true }) size: 'small' | 'normal' = 'normal'
	@Prop({ mutable: true }) disabled: boolean = false

	@Watch('disabled')
	disabledHandler() {
		if (this.disabled && !this.initialRender) {
			this.el.shadowRoot.querySelector('span').classList.add('disabled')
		}
	}

	@Watch('appearance')
	appearanceHandler() {
		const shadowRoot = this.el.shadowRoot
		const div = shadowRoot.querySelector('div')
		const span = shadowRoot.querySelector('span')

		div.classList.add('appearanceChange')
		span.classList.add('appearanceChange')

		ensureRequestAnimationFrame(() => {
			div.classList.remove('appearanceChange')
			span.classList.remove('appearanceChange')
		})
	}

	/**
	 * The loading state displays a spinner and effectively disables the button to user input. Does not affect buttons with the `link` appearance.
	 */
	@Prop({ mutable: true })
	loading: boolean = false

	@State() theme: Theme = 'Light'
	@State() initialRender: boolean = true

	/**
	 * Emitted when the button is pressed or either Spacebar or Enter are being pressed when the button is focused.
	 */
	@Event() cmPress: EventEmitter<{}>

	@Element() el: HTMLElement

	/**
	 * Triggers the press event. Respects the disabled state unless forced.
	 */
	@Method()
	async press(options: { forcePress?: boolean } = {}) {
		if (
			(!this.disabled &&
				(!this.loading ||
					(this.loading && this.appearance === 'link'))) ||
			options.forcePress
		) {
			this.cmPress.emit()
		}
	}

	@Listen('click')
	handleClick() {
		if (
			!this.disabled &&
			(!this.loading || (this.loading && this.appearance === 'link'))
		) {
			this.press()
		}
	}

	@Listen('keydown')
	handleKeyDown(event: KeyboardEvent) {
		if (event.key === ' ' || event.key === 'Enter') {
			if (
				!this.disabled &&
				(!this.loading || (this.loading && this.appearance === 'link'))
			) {
				this.press()
			}
		}
	}

	componentWillLoad() {
		onThemeChange((theme) => {
			this.theme = theme
		})
	}

	componentDidRender() {
		requestAnimationFrame(() => {
			this.initialRender = false

			if (!this.disabled) {
				this.el.shadowRoot
					.querySelector('span')
					.classList.remove('disabled')
			}
		})
	}

	render() {
		let classes = {
			[this.appearance]: true,
			[this.theme]: true,
			[this.size]: true,
			initialRender: this.initialRender,
			disabled: this.disabled,
			loading: this.loading,
		}

		let tabIndex = 0

		if (this.disabled) {
			tabIndex = -1
		}

		return (
			<Host>
				<div
					tabindex={tabIndex}
					class={classes}
					role="button"
					aria-disabled={this.disabled}
				>
					<cm-loader
						size="small"
						color={
							this.appearance === 'danger' ||
							this.appearance === 'primary'
								? 'light'
								: 'dark'
						}
					/>
					<span>{this.label}</span>
				</div>
			</Host>
		)
	}
}
