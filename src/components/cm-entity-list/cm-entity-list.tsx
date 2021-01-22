import { Component, Host, h, Prop } from '@stencil/core'

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
		overrideCSS?: Record<string, string>
	}> = []

	@Prop() entities: Array<{
		onPress?: () => void
		data: Array<
			| { type: 'text'; content: string; showCopyButton?: boolean }
			| { type: 'image'; src: string }
			| { type: 'button'; label: string; onPress: () => void }
		>
	}> = []

	render() {
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
								appearance="main"
								label={this.createButtonLabel}
								onCmPress={this.createHandler}
							></cm-button>
						</div>
						<div
							class="columnHeaders"
							style={{
								gridTemplateColumns: this.columns
									.map((column) => column.width)
									.join(' '),
							}}
						>
							{this.columns.map(({ name }) => {
								return <div class="columnHeader">{name}</div>
							})}
						</div>
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

						{this.entities.map((entity) => {
							return (
								<div
									class="entity"
									style={{
										gridTemplateColumns: this.columns
											.map((column) => column.width)
											.join(' '),
										cursor: entity.onPress
											? 'pointer'
											: 'default',
									}}
									onClick={entity.onPress}
								>
									{entity.data.map((item, index) => {
										let content
										let copyButtonCSS = {}

										if (item.type === 'text') {
											content = item.content

											if (item.showCopyButton) {
												copyButtonCSS = {
													gridAutoFlow: 'column',
													gridAutoColumns:
														'max-content',
													gap: '10px',
												}
											}
										}

										if (item.type === 'image') {
											content = <img src={item.src} />
										}

										if (item.type === 'button') {
											content = (
												<cm-button
													appearance="link"
													label={item.label}
													onCmPress={item.onPress}
												/>
											)
										}

										return (
											<div
												class="cell"
												style={{
													...(this.columns[index]
														?.overrideCSS ?? {}),
													...copyButtonCSS,
												}}
											>
												{content}
												{item.type === 'text' &&
												item.showCopyButton ? (
													<cm-icon-button
														icon="copy"
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
						})}
						{this.loading ? (
							<div class="loader">
								<cm-loader size="normal" />
							</div>
						) : (
							''
						)}
					</div>
				</div>
			</Host>
		)
	}
}
