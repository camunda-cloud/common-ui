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
} from '@stencil/core'
import { onThemeChange, Theme } from '../../globalHelpers'

@Component({
	tag: 'cm-button',
	styleUrl: 'cm-button.scss',
	shadow: true,
})
export class CmButton implements ComponentInterface {
	@Prop() appearance: 'main' | 'primary' | 'secondary' | 'danger' | 'link' =
		'main'
	@Prop() label: string = ''
	@Prop() disabled: boolean = false
	@State() latestFocusWasClick: boolean = false
	@State() theme: Theme = 'Light'
	@State() initialRender: boolean = true

	@Event() cmPress: EventEmitter<{}>
	@Element() el: HTMLElement

	// Prevent clicks from giving visual focus
	@Listen('mousedown', { passive: false })
	handleMouseDown(event: MouseEvent) {
		this.latestFocusWasClick = true
		event.preventDefault()
	}

	@Listen('blur', { passive: false })
	handleBlur() {
		this.latestFocusWasClick = false
	}

	@Listen('click')
	handleClick() {
		if (!this.disabled) {
			this.cmPress.emit()
		}
	}

	@Listen('keydown')
	handleKeyDown(event: KeyboardEvent) {
		if (
			!(event.key === 'Control') &&
			!(event.key === 'Meta') &&
			!(event.key === 'Alt') &&
			!(event.key === 'Shift' && event.code !== 'Tab')
		) {
			this.latestFocusWasClick = false
		}

		if (event.key === ' ' || event.key === 'Enter') {
			if (!this.disabled) {
				this.cmPress.emit()
			}
		}
	}

	componentWillLoad() {
		onThemeChange((theme) => {
			this.theme = theme
		})
	}

	componentWillUpdate() {
		if (this.latestFocusWasClick) {
			this.el.focus()
		}
	}

	componentDidRender() {
		requestAnimationFrame(() => {
			this.initialRender = false
		})
	}

	render() {
		console.log(this.theme)
		let classes = {
			[this.appearance]: true,
			[this.theme]: true,
			initialRender: this.initialRender,
			clicked: this.latestFocusWasClick,
			disabled: this.disabled,
		}

		let tabIndex = 0

		if (this.disabled) {
			tabIndex = -1
		}

		return (
			<Host tabindex={tabIndex} class={classes}>
				{this.label}
			</Host>
		)
	}
}
