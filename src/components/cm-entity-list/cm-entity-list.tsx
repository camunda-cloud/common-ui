import { Component, Host, h, Prop, State, Element, Method } from '@stencil/core'
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
	@Prop({ mutable: true }) loading: boolean = false

	@Prop({ mutable: true }) headline: string = ''
	@Prop({ mutable: true }) createButtonLabel: string = ''

	@Prop({ mutable: true }) enableCreateButton: boolean = true
	@Prop({ mutable: true }) hideCreateButton: boolean = false
	@Prop({ mutable: true }) hideSearch: boolean = false

	@Prop({ mutable: true }) createHandler: () => void = () => {}

	@Prop({ mutable: true }) columns: Array<{
		name: string
		width: string
		ellipsis?: 'off' | 'left' | 'right'
		overrideCSS?: Record<string, string>
	}> = []

	@Prop({ mutable: true }) entities: Array<Entity> = []

	@Prop({ mutable: true }) groupOptions: Array<DropdownOptionGroup> = []

	@Prop({ mutable: true }) defaultSorting?: SortingDescription

	@Prop({ mutable: true }) addScrollPadding?: boolean = false

	@State() userSelectedSorting?: SortingDescription
	@State() selectedEntities: Array<Entity> = []
	@State() isSearchOpen: boolean = false
	@State() filter: string = ''
	@State() entitiesAreScrolled: boolean = false

	@Element() element: HTMLElement

	componentDidUpdate() {
		;(
			this.element.shadowRoot.querySelector('#searchInput') as HTMLElement
		)?.focus()
	}

	/**
	 * Triggers an option of entity at the given index as if selected by the user, if available. Note that the entity index is based of the entity array and ignores all sorting.
	 */
	@Method()
	async triggerEntityOption(options: {
		entityIndex: number
		optionGroupIndex: number
		optionIndex: number
	}) {
		;(
			this.element.shadowRoot.querySelectorAll(
				'.entity cm-dropdown',
			) as NodeListOf<HTMLCmDropdownElement>
		)
			.item(options.entityIndex)
			?.triggerOptionByIndex(
				options.optionGroupIndex,
				options.optionIndex,
			)
	}

	/**
	 * Triggers an option of the group-actions-dropdown as if selected by the user, if available. Needs selected entities to function.
	 */
	@Method()
	async triggerGroupOption(optionGroupIndex: number, optionIndex: number) {
		;(
			this.element.shadowRoot.querySelector(
				'.header cm-dropdown',
			) as HTMLCmDropdownElement
		)?.triggerOptionByIndex(optionGroupIndex, optionIndex)
	}

	/**
	 * Selects all entities.
	 */
	@Method()
	async selectAll() {
		this.selectedEntities = [...this.entities]
	}

	/**
	 * De-selects all entities.
	 */
	@Method()
	async deselectAll() {
		this.selectedEntities = []
	}

	/**
	 * Selects the entity at the given index. Note that the index is based of the entity array and ignores all sorting.
	 */
	@Method()
	async selectIndex(index: number) {
		let targetEntity = this.entities[index]
		if (!this.selectedEntities.includes(targetEntity)) {
			this.selectedEntities = [...this.selectedEntities, targetEntity]
		}
	}

	/**
	 * De-selects the entity at the given index. Note that the index is based of the entity array and ignores all sorting.
	 */
	@Method()
	async deselectIndex(index: number) {
		let targetEntity = this.entities[index]

		if (this.selectedEntities.includes(targetEntity)) {
			let selectedEntityIndex =
				this.selectedEntities.indexOf(targetEntity)
			let newEntities = this.selectedEntities.slice(0)
			newEntities.splice(selectedEntityIndex, 1)

			this.selectedEntities = newEntities
		}
	}

	render() {
		let loader: unknown,
			entities: unknown,
			columnHeaderIcon: unknown,
			groupDropdown: unknown,
			search: unknown

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
						if (
							data.content
								.toLocaleLowerCase()
								.includes(this.filter.toLocaleLowerCase())
						) {
							return true
						}
					}
				}

				return false
			})
		}

		if (this.loading) {
			loader = (
				<div
					class="loader"
					style={{
						zIndex: (filteredEntities.length + 1).toString(),
					}}
				>
					<cm-loader size="normal" />
				</div>
			)
		}

		entities = filteredEntities.map((entity, index) => {
			let entityClasses = {
				entity: true,
				selected: this.selectedEntities.includes(entity),
				hasPress: typeof entity.onPress === 'function',
			}

			return (
				<div
					class={entityClasses}
					style={{
						gridTemplateColumns: gridTemplateColumns,
						cursor: entity.onPress ? 'pointer' : 'default',
						zIndex: (filteredEntities.length - index).toString(),
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
										let index =
											this.selectedEntities.indexOf(
												entity,
											)
										let newEntities =
											this.selectedEntities.slice(0)
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

								;(event as any).detail.selectedEntities =
									this.selectedEntities
								originalHandler(event)
							}

							return option
						})

						return optionGroup
					})}
				></cm-dropdown>
			)
		}

		if (!this.hideSearch) {
			if (this.isSearchOpen) {
				search = (
					<div class="search open">
						<input
							type="text"
							id="searchInput"
							placeholder="Search"
							onInput={(event: InputEvent) => {
								this.filter = (
									event.target as HTMLInputElement
								)?.value
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
		}

		let headerClasses = {
			header: true,
			entitiesAreScrolled: this.entitiesAreScrolled,
		}

		let entitiesClasses = {
			entities: true,
			scrollPadding: this.addScrollPadding,
		}

		return (
			<Host>
				<div class="container">
					<div class={headerClasses}>
						<div class="headline">{this.headline}</div>
						<div class="buttons">
							{search}
							{groupDropdown}
							{!this.hideCreateButton ? (
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
							) : (
								''
							)}
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
							</div>
						) : (
							''
						)}
					</div>
					<div
						class={entitiesClasses}
						onScroll={(event) => {
							this.entitiesAreScrolled =
								(event.target as HTMLElement).scrollTop !== 0
						}}
					>
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
					</div>

					{loader}
				</div>
			</Host>
		)
	}
}
