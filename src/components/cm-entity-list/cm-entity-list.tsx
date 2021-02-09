import { Component, Host, h, Prop, State } from '@stencil/core'
import { CmDropdown } from '../cm-dropdown/cm-dropdown'

export type SortingDescription = {
	columnIndex: number
	method: 'ascending' | 'descending'
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

	@Prop() entities: Array<{
		onPress?: () => void
		data: Array<
			| { type: 'text'; content: string; showCopyButton?: boolean }
			| { type: 'image'; src: string }
			| { type: 'button'; label: string; onPress: () => void }
			| { type: 'contextMenu'; options: CmDropdown['options'] }
		>
	}> = []

	@Prop() defaultSorting?: SortingDescription

	@State() userSelectedSorting?: SortingDescription

	render() {
		let loader: any, entities: any, columnHeaderIcon: any

		if (this.loading) {
			loader = (
				<div class="loader">
					<cm-loader size="normal" />
				</div>
			)
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

		entities = sortedEntities.map((entity) => {
			return (
				<div
					class="entity"
					style={{
						gridTemplateColumns: this.columns
							.map((column) => column.width)
							.join(' '),
						cursor: entity.onPress ? 'pointer' : 'default',
					}}
					onClick={entity.onPress}
				>
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
										: {}),
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

		return (
			<Host>
				<div class="container">
					<div class="header">
						<div class="headline">{this.headline}</div>
						<div class="buttons">
							<cm-button
								disabled={
									!this.enableCreateButton || this.loading
								}
								appearance="primary"
								label={this.createButtonLabel}
								onCmPress={this.createHandler}
							></cm-button>
						</div>
						{this.entities.length ? (
							<div
								class="columnHeaders"
								style={{
									gridTemplateColumns: this.columns
										.map((column) => column.width)
										.join(' '),
								}}
							>
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
											{name}
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
