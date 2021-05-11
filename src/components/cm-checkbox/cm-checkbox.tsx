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
	tag: 'cm-checkbox',
	styleUrl: 'cm-checkbox.scss',
	shadow: true,
})
export class CmCheckbox {
	@Prop({ reflect: true, mutable: true }) label: string = ''
	@Prop({ reflect: true, mutable: true }) checked: boolean = false
	@Prop({ reflect: true, mutable: true }) indeterminate: boolean = false
	@Prop({ reflect: true, mutable: true }) disabled: boolean = false

	@Event() cmInput: EventEmitter<{ isChecked: boolean }>

	checkbox: HTMLDivElement

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
		let checkboxClasses = {
			checkbox: true,
			indeterminate: this.indeterminate,
			checked: this.checked,
			disabled: this.disabled,
		}

		let tabIndex = 0

		if (this.disabled) {
			tabIndex = -1
		}

		return (
			<Host>
				<div class="container">
					<div
						tabindex={tabIndex}
						class={checkboxClasses}
						ref={(element) =>
							(this.checkbox = element as HTMLDivElement)
						}
						role="checkbox"
						aria-disabled={this.disabled}
					></div>
					<label>{this.label}</label>
				</div>
			</Host>
		)
	}
}
