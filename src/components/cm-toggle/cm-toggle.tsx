import {
	Component,
	Host,
	h,
	Prop,
	Listen,
	Event,
	EventEmitter,
	Method,
} from '@stencil/core'

@Component({
	tag: 'cm-toggle',
	styleUrl: 'cm-toggle.scss',
	shadow: true,
})
export class CmToggle {
	@Prop({ reflect: true }) label: string = ''
	@Prop({ reflect: true }) checked: boolean = false
	@Prop({ reflect: true }) disabled: boolean = false

	@Event() cmInput: EventEmitter<{ isChecked: boolean }>

	toggle: HTMLDivElement

	@Listen('keydown')
	handleKeyDown(event: KeyboardEvent) {
		if (event.key === ' ') {
			if (!this.disabled) {
				this.toggleCheck()
			}
		}
	}

	@Listen('click')
	handleClick() {
		if (!this.disabled) {
			this.toggleCheck()
		}
	}

	@Method()
	async toggleCheck() {
		this.checked = !this.checked
		this.cmInput.emit({ isChecked: this.checked })
	}

	@Method()
	async check() {
		this.checked = true
		this.cmInput.emit({ isChecked: this.checked })
	}

	@Method()
	async uncheck() {
		this.checked = false
		this.cmInput.emit({ isChecked: this.checked })
	}

	render() {
		let toggleClasses = {
			toggle: true,
			checked: this.checked,
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
					class={toggleClasses}
					ref={(element) => (this.toggle = element as HTMLDivElement)}
					role="checkbox"
					aria-disabled={this.disabled}
				></div>
				<label>{this.label}</label>
			</Host>
		)
	}
}
