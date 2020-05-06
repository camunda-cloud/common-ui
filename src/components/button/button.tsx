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
	styleUrl: 'button.scss',
	shadow: true,
})
export class Button implements ComponentInterface {
	@Prop() appearance: 'primary' | 'secondary' | 'danger' = 'secondary'
	@Prop() label: string = ''
	@Prop() disabled: boolean = false

	@Event() cmPress: EventEmitter<{ triggeredBy: 'Keyboard' | 'Mouse' }>

	@Listen('keydown')
	handleKeyDown(event: KeyboardEvent) {
		if (event.key === ' ' || event.key === 'Enter') {
			if (!this.disabled) {
				this.cmPress.emit({ triggeredBy: 'Keyboard' })
			}
		}
	}

	@Listen('click')
	handleClick() {
		if (!this.disabled) {
			this.cmPress.emit({ triggeredBy: 'Mouse' })
		}
	}

	render() {
		let classes = {
			primary: false,
			secondary: false,
			danger: false,
			disabled: this.disabled,
		}

		if (this.appearance === 'danger') {
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
