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

	/**
	 * The Index of the active filter.
	 */
	@Prop({ mutable: true }) activeFilterIndex: number = 0

	/**
	 * Emitted whenever the selected filter changes.
	 */
	@Event() cmFilterSelected: EventEmitter<{ value: string }>

	render() {
		return (
			<Host>
				<div class="container">
					{this.filters.map((item, index) => {
						let tabindex
						let classes = {
							pill: true,
							active: index === this.activeFilterIndex,
							disabled: item.disabled,
						}

						if (!item.title) {
							item.title = ''
						}

						if (!item.disabled) {
							tabindex = 0
						}

						return (
							<a
								class={classes}
								tabindex={tabindex}
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
								onKeyDown={(event) => {
									if (
										!item.disabled &&
										this.activeFilterIndex !== index &&
										event.key === ' '
									) {
										this.activeFilterIndex = index
										this.cmFilterSelected.emit({
											value: item.value,
										})
										
										event.preventDefault()
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
