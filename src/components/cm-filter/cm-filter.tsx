import { Component, Host, h, Prop, EventEmitter, Event } from '@stencil/core'

@Component({
	tag: 'cm-filter',
	styleUrl: 'cm-filter.scss',
	shadow: true,
})
export class CmFilter {
	@Prop() filters: Array<{
		label: string
		value: string
		disabled?: boolean
	}> = []
	@Prop() activeFilterIndex: number = 0

	@Event() cmFilterSelected: EventEmitter<{ value: string }>

	render() {
		return (
			<Host>
				<div class="container">
					{this.filters.map((item, index) => {
						let classes = {
							pill: true,
							active: index === this.activeFilterIndex,
							disabled: item.disabled,
						}
						return (
							<div
								class={classes}
								onClick={() => {
									if (
										!item.disabled &&
										this.activeFilterIndex !== index
									) {
										this.activeFilterIndex = index
										this.cmFilterSelected.emit({
											value: item.value,
										})
									}
								}}
							>
								{item.label}
							</div>
						)
					})}
				</div>
			</Host>
		)
	}
}
