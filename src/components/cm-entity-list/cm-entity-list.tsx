import { Component, Host, h, Prop, State, Element } from '@stencil/core'
import { CmDropdown, DropdownOptionGroup } from '../cm-dropdown/cm-dropdown'

export type SortingDescription = {
	columnIndex: number
	method: 'ascending' | 'descending'
}

export type Entity = {
	onPress?: () => void
	data: Array<
		| {
				type: 'text'
				content: string
				showCopyButton?: boolean
		  }
		| {
				type: 'image'
				src: string
		  }
		| {
				type: 'button'
				label: string
				onPress: () => void
		  }
		| {
				type: 'contextMenu'
				options: CmDropdown['options']
		  }
	>
	meta?: unknown
}

@Component({
	tag: 'cm-entity-list',
	styleUrl: 'cm-entity-list.scss',
	shadow: true,
})
export class CmEntityList {
	@Prop() enableCreateButton: boolean = true
	@Prop() loading: boolean = false

	@Prop() headline: string = ''
	@Prop() createButtonLabel: string = ''

	@Prop() createHandler: () => void = () => {}

	@Prop() columns: Array<{
		name: string
		width: string
		ellipsis?: 'off' | 'left' | 'right'
		overrideCSS?: Record<string, string>
	}> = []

	@Prop() entities: Array<Entity> = []

	@Prop() groupOptions: Array<DropdownOptionGroup> = []

	@Prop() defaultSorting?: SortingDescription

	@State() userSelectedSorting?: SortingDescription
	@State() selectedEntities: Array<Entity> = []
	@State() isSearchOpen: boolean = false
	@State() filter: string = ''

	@Element() element: HTMLElement

	componentDidUpdate() {
		;(this.element.shadowRoot.querySelector(
			'#searchInput',
		) as HTMLElement)?.focus()
	}

	render() {
		let loader: unknown,
			entities: unknown,
			columnHeaderIcon: unknown,
			groupDropdown: unknown,
			search: unknown

		if (this.loading) {
			loader = (
				<div class="loader">
					<cm-loader size="normal" />
				</div>
			)
		}

		for (let i = 0; i < this.selectedEntities.length; i++) {
			let entity = this.selectedEntities[i]

			if (!this.entities.includes(entity)) {
				this.selectedEntities.splice(i, 1)
				i--
			}
		}

		let gridTemplateColumns = ''

		if (this.groupOptions.length) {
			gridTemplateColumns = `25px ${this.columns
				.map((column) => column.width)
				.join(' ')}`
		} else {
			gridTemplateColumns = this.columns
				.map((column) => column.width)
				.join(' ')
		}

		let sortedEntities = this.entities.slice(0)
		let sorting: SortingDescription | null = null

		if (this.userSelectedSorting) {
			sorting = this.userSelectedSorting
		} else if (this.defaultSorting) {
			sorting = this.defaultSorting
		}

		if (sorting !== null) {
			sortedEntities.sort((a, b) => {
				const leftValue = a.data[sorting.columnIndex]
				const rightValue = b.data[sorting.columnIndex]

				if (leftValue.type === 'text' && rightValue.type === 'text') {
					if (sorting.method === 'ascending') {
						return leftValue.content.localeCompare(
							rightValue.content,
						)
					} else {
						return rightValue.content.localeCompare(
							leftValue.content,
						)
					}
				} else {
					return 0
				}
			})

			if (sorting.method === 'ascending') {
				columnHeaderIcon = <cm-icon icon="up"></cm-icon>
			} else {
				columnHeaderIcon = <cm-icon icon="down"></cm-icon>
			}
		}

		const createSortingToggle = (index) => {
			return () => {
				if (this.userSelectedSorting?.columnIndex === index) {
					if (this.userSelectedSorting.method === 'ascending') {
						this.userSelectedSorting = {
							columnIndex: index,
							method: 'descending',
						}
					} else {
						this.userSelectedSorting = {
							columnIndex: index,
							method: 'ascending',
						}
					}
				} else if (this.defaultSorting?.columnIndex === index) {
					if (this.defaultSorting.method === 'ascending') {
						this.userSelectedSorting = {
							columnIndex: index,
							method: 'descending',
						}
					} else {
						this.userSelectedSorting = {
							columnIndex: index,
							method: 'ascending',
						}
					}
				} else {
					this.userSelectedSorting = {
						columnIndex: index,
						method: 'ascending',
					}
				}
			}
		}

		let filteredEntities = sortedEntities

		if (this.filter.length) {
			filteredEntities = filteredEntities.filter((entity) => {
				for (let data of entity.data) {
					if (data.type === 'text') {
						if (data.content.includes(this.filter)) {
							return true
						}
					}
				}

				return false
			})
		}

		entities = filteredEntities.map((entity) => {
			let entityClasses = {
				entity: true,
				selected: this.selectedEntities.includes(entity),
			}

			return (
				<div
					class={entityClasses}
					style={{
						gridTemplateColumns: gridTemplateColumns,
						cursor: entity.onPress ? 'pointer' : 'default',
					}}
					onClick={entity.onPress}
				>
					{this.groupOptions.length ? (
						<div class="cell">
							<cm-checkbox
								class={{
									visible: this.selectedEntities.length > 0,
								}}
								onClick={(event) => {
									event.preventDefault()
									event.stopPropagation()
								}}
								checked={this.selectedEntities.includes(entity)}
								onCmInput={() => {
									if (
										this.selectedEntities.includes(entity)
									) {
										let index = this.selectedEntities.indexOf(
											entity,
										)
										let newEntities = this.selectedEntities.slice(
											0,
										)
										newEntities.splice(index, 1)

										this.selectedEntities = newEntities
									} else {
										this.selectedEntities = [
											...this.selectedEntities,
											entity,
										]
									}
								}}
							></cm-checkbox>
						</div>
					) : (
						''
					)}

					{entity.data.map((item, index) => {
						let column = this.columns[index]
						let content: any
						let itemCSS = {}
						let spanCSS = {}

						let ellipsis: 'off' | 'left' | 'right'

						if (
							column.ellipsis === undefined ||
							column.ellipsis == 'off'
						) {
							ellipsis = 'off'
						} else {
							ellipsis = column.ellipsis
						}

						if (item.type === 'text') {
							if (ellipsis === 'left') {
								spanCSS = {
									textOverflow: 'ellipsis',
									whiteSpace: 'nowrap',
									overflow: 'hidden',
									direction: 'rtl',
								}
							}

							if (ellipsis === 'right') {
								spanCSS = {
									textOverflow: 'ellipsis',
									whiteSpace: 'nowrap',
									overflow: 'hidden',
								}
							}

							content = (
								<span style={spanCSS}>{item.content}</span>
							)

							if (item.showCopyButton) {
								itemCSS = {
									...itemCSS,
									...(ellipsis === 'off'
										? { gridAutoColumns: 'max-content' }
										: {
												gridAutoColumns:
													'minmax(0, min-content)',
										  }),
									...{
										gridAutoFlow: 'column',
										gap: '10px',
									},
								}
							}
						}

						if (item.type === 'image') {
							content = <img src={item.src} />
						}

						if (item.type === 'button') {
							itemCSS = { gridAutoColumns: 'max-content' }

							content = (
								<cm-button
									appearance="link"
									label={item.label}
									onClick={(event) => {
										event.preventDefault()
										event.stopPropagation()
									}}
									onCmPress={item.onPress}
								/>
							)
						}

						if (item.type === 'contextMenu') {
							content = (
								<cm-dropdown
									onClick={(event) => {
										event.preventDefault()
										event.stopPropagation()
									}}
									trigger={{
										type: 'icon',
										icon: 'contextMenu',
									}}
									options={item.options}
								/>
							)
						}

						return (
							<div
								class="cell"
								style={{
									...(this.columns[index]?.overrideCSS ?? {}),
									...itemCSS,
								}}
							>
								{content}
								{item.type === 'text' && item.showCopyButton ? (
									<cm-icon-button
										icon="copy"
										onClick={(event) => {
											event.preventDefault()
											event.stopPropagation()
										}}
										onCmPress={() => {
											navigator.clipboard.writeText(
												item.content,
											)
										}}
									/>
								) : (
									''
								)}
							</div>
						)
					})}
				</div>
			)
		})

		if (this.selectedEntities.length && this.groupOptions.length) {
			let label = ''

			if (this.selectedEntities.length === 1) {
				label = '1 item selected'
			} else {
				label = `${this.selectedEntities.length} items selected`
			}

			groupDropdown = (
				<cm-dropdown
					trigger={{
						type: 'button',
						appearance: 'primary',
						label: label,
					}}
					options={this.groupOptions.map((optionGroup) => {
						optionGroup.options.map((option) => {
							let originalHandler = option.handler

							option.handler = (event) => {
								if (!(event as any).detail) {
									;(event as any).detail = {}
								}

								;(event as any).detail.selectedEntities = this.selectedEntities
								originalHandler(event)
							}

							return option
						})

						return optionGroup
					})}
				></cm-dropdown>
			)
		}

		if (this.isSearchOpen) {
			search = (
				<div class="search open">
					<input
						type="text"
						id="searchInput"
						placeholder="Search"
						onInput={(event: InputEvent) => {
							this.filter = (event.target as HTMLInputElement)?.value
						}}
					/>
					<cm-icon-button
						icon="closeLarge"
						onCmPress={() => {
							this.filter = ''
							this.isSearchOpen = false
						}}
					/>
				</div>
			)
		} else {
			search = (
				<div class="search">
					<cm-icon-button
						icon="search"
						onCmPress={() => {
							this.isSearchOpen = true
						}}
					/>
				</div>
			)
		}

		return (
			<Host>
				<div class="container">
					<div class="header">
						<div class="headline">{this.headline}</div>
						<div class="buttons">
							{search}
							{groupDropdown}
							<cm-button
								disabled={
									!this.enableCreateButton || this.loading
								}
								appearance={
									this.selectedEntities.length
										? 'secondary'
										: 'primary'
								}
								label={this.createButtonLabel}
								onCmPress={this.createHandler}
							></cm-button>
						</div>
						{this.entities.length ? (
							<div
								class="columnHeaders"
								style={{
									gridTemplateColumns: gridTemplateColumns,
								}}
							>
								{this.groupOptions.length ? (
									<cm-checkbox
										class={{
											visible:
												this.selectedEntities.length >
												0,
										}}
										checked={
											this.selectedEntities.length ===
											this.entities.length
										}
										onCmInput={(event) => {
											if (event.detail.isChecked) {
												this.selectedEntities = [
													...this.entities,
												]
											} else {
												this.selectedEntities = []
											}
										}}
									></cm-checkbox>
								) : (
									''
								)}
								{this.columns.map(({ name }, index) => {
									return (
										<div
											class="columnHeader"
											onClick={
												name.length
													? createSortingToggle(index)
													: () => {}
											}
										>
											<span>{name}</span>
											{sorting?.columnIndex === index
												? columnHeaderIcon
												: ''}
										</div>
									)
								})}

								{this.loading ? <div class="loader"></div> : ''}
							</div>
						) : (
							''
						)}
					</div>
					<div class="entities">
						<div
							style={{
								display:
									this.entities.length || this.loading
										? 'none'
										: 'grid',
							}}
						>
							<slot name="empty"></slot>
						</div>

						{entities}

						{loader}
					</div>
				</div>
			</Host>
		)
	}
}
