import {
	Component,
	ComponentInterface,
	Host,
	h,
	Prop,
	EventEmitter,
	Listen,
	Event,
} from '@stencil/core'

@Component({
	tag: 'cm-button',
	styleUrl: 'cm-button.scss',
	shadow: true,
})
export class CmButton implements ComponentInterface {
	@Prop() appearance: 'main' | 'primary' | 'secondary' | 'danger' = 'main'
	@Prop() label: string = ''
	@Prop() disabled: boolean = false

	@Event() cmPress: EventEmitter<{}>

	@Listen('keydown')
	handleKeyDown(event: KeyboardEvent) {
		if (event.key === ' ' || event.key === 'Enter') {
			if (!this.disabled) {
				this.cmPress.emit()
			}
		}
	}

	@Listen('click')
	handleClick() {
		if (!this.disabled) {
			this.cmPress.emit()
		}
	}

	render() {
		let classes = {
			main: false,
			primary: false,
			secondary: false,
			danger: false,
			disabled: this.disabled,
		}

		if (this.appearance === 'main') {
			classes.main = true
		} else if (this.appearance === 'danger') {
			classes.danger = true
		} else if (this.appearance === 'primary') {
			classes.primary = true
		} else {
			classes.secondary = true
		}

		let tabIndex = 0

		if (this.disabled) {
			tabIndex = -1
		}

		return (
			<Host>
				<div tabindex={tabIndex} class={classes}>
					{this.label}
				</div>
			</Host>
		)
	}
}
