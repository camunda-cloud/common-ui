import { Component, Host, h, Prop, EventEmitter, Event } from '@stencil/core'

@Component({
	tag: 'cm-filter',
	styleUrl: 'cm-filter.scss',
	shadow: true,
})
export class CmFilter {
	@Prop({ mutable: true }) filters: Array<{
		label: string
		value: string
		title?: string
		disabled?: boolean
	}> = []
	@Prop({ mutable: true }) activeFilterIndex: number = 0

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

						if (!item.title) {
							item.title = ''
						}

						return (
							<a
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
								title={item.title}
							>
								{item.label}
							</a>
						)
					})}
				</div>
			</Host>
		)
	}
}
