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
} from '@stencil/core'
import { onThemeChange, Theme } from '../../globalHelpers'

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
	@State() theme: Theme = 'Light'
	@State() initialRender: boolean = true

	@Event() cmPress: EventEmitter<{}>
	@Element() el: HTMLElement

	/**
	 * Triggers the press event. Respects the disabled state unless forced.
	 */
	@Method()
	async press(options: { forcePress?: boolean } = {}) {
		if (!this.disabled || options.forcePress) {
			this.cmPress.emit()
		}
	}

	@Listen('click')
	handleClick() {
		if (!this.disabled) {
			this.press()
		}
	}

	@Listen('keydown')
	handleKeyDown(event: KeyboardEvent) {
		if (event.key === ' ' || event.key === 'Enter') {
			if (!this.disabled) {
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
		})
	}

	render() {
		let classes = {
			[this.appearance]: true,
			[this.theme]: true,
			[this.size]: true,
			initialRender: this.initialRender,
			disabled: this.disabled,
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
					{this.label}
				</div>
			</Host>
		)
	}
}
