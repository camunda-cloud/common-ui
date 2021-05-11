import {
	Component,
	Host,
	h,
	Prop,
	State,
	Listen,
	Element,
	Method,
} from '@stencil/core'
import { CmIconButton } from '../cm-icon-button/cm-icon-button'

export type DropdownOption =
	| {
			label: string
			title?: string
			isDangerous?: boolean
			isDisabled?: false
			handler: (event: { preventDismissal: () => void }) => void
	  }
	| {
			label: string
			title?: string
			isDangerous?: boolean
			isDisabled: true
			handler?: (event: { preventDismissal: () => void }) => void
	  }

export type DropdownOptionGroup = {
	title?: string
	options: Array<DropdownOption>
}

@Component({
	tag: 'cm-dropdown',
	styleUrl: 'cm-dropdown.scss',
	shadow: true,
})
export class CmDropdown {
	@Element() el: HTMLElement

	@Prop({ mutable: true }) trigger:
		| { type: 'icon'; icon: CmIconButton['icon'] }
		| {
				type: 'button'
				label: string
				appearance: 'main' | 'primary' | 'secondary'
		  } = { type: 'button', label: '', appearance: 'main' }

	@Prop({ mutable: true }) options: Array<DropdownOptionGroup> = []

	@State() shouldStayOpen = false
	@State() isOpen: boolean = false

	triggerOption(option: DropdownOption) {
		if (option.isDisabled) {
			return
		}

		option.handler({
			preventDismissal: () => {
				this.shouldStayOpen = true
			},
		})

		if (this.shouldStayOpen) {
			this.shouldStayOpen = false
		} else {
			this.isOpen = false

			setTimeout(() => {
				this.el.blur()
			}, 10)
		}
	}

	@Method()
	async open() {
		this.isOpen = true
	}

	@Method()
	async close() {
		this.isOpen = false
	}

	@Method()
	async triggerOptionByIndex(optionGroupIndex: number, optionIndex: number) {
		this.triggerOption(this.options[optionGroupIndex].options[optionIndex])
	}

	@Listen('blur') onBlur() {
		this.isOpen = false
	}

	private _renderOption(option: DropdownOption) {
		let optionClasses = {
			option: true,
			isDangerous: option.isDangerous ?? false,
			isDisabled: option.isDisabled ?? false,
		}

		return (
			<div
				class={optionClasses}
				onClick={() => {
					this.triggerOption(option)
				}}
			>
				<div class="title">{option.title}</div>
				{option.label}
			</div>
		)
	}

	render() {
		let flyoutClasses = {
			flyout: true,
			open: this.isOpen,
		}

		let trigger: any, flyout: any
		if (this.trigger) {
			if (this.trigger.type === 'icon') {
				trigger = (
					<div class="trigger">
						<cm-icon-button
							tabindex="0"
							icon={this.trigger.icon}
							onCmPress={() => {
								this.isOpen = !this.isOpen
							}}
						/>
					</div>
				)
			} else {
				let buttonClasses = {
					button: true,
					[this.trigger.appearance]: true,
				}

				trigger = (
					<div class="trigger">
						<div
							tabindex="0"
							class={buttonClasses}
							onClick={() => {
								this.isOpen = !this.isOpen
							}}
						>
							{this.trigger.label} <cm-icon icon="down"></cm-icon>
						</div>
					</div>
				)
			}
		} else {
			console.error('[cm-dropdown] .trigger is not defined!')
		}

		flyout = (
			<div class={flyoutClasses}>
				{this.options.map((option) => {
					return (
						<div class="optionGroup">
							<div class="title">{option.title}</div>
							{option.options.map((option) => {
								return this._renderOption(option)
							})}
						</div>
					)
				})}
			</div>
		)

		return (
			<Host>
				<div class="container">
					{trigger}
					{flyout}
				</div>
			</Host>
		)
	}
}
