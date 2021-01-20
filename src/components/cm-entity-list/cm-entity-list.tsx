import { Component, Host, h, Prop } from '@stencil/core'

@Component({
	tag: 'cm-entity-list',
	styleUrl: 'cm-entity-list.scss',
	shadow: true,
})
export class CmEntityList {
	@Prop() headline: string = ''
	@Prop() createButtonLabel: string = ''
	@Prop() columns: Array<{
		name: string
		width: string
		overrideCSS: Record<string, string>
	}> = []
	@Prop() entities: Array<{
		onPress?: () => void
		data: Array<
			{ type: 'text'; content: string } | { type: 'image'; src: string }
		>
	}> = []
	@Prop() createHandler: () => void = () => {}

	render() {
		return (
			<Host>
				<div class="container">
					<div class="header">
						<div class="headline">{this.headline}</div>
						<div class="buttons">
							<cm-button
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
						{this.entities.map((entity) => {
							return (
								<div
									class="entity"
									style={{
										gridTemplateColumns: this.columns
											.map((column) => column.width)
											.join(' '),
									}}
								>
									{entity.data.map((item, index) => {
										let content

										if (item.type === 'text') {
											content = item.content
										}

										if (item.type === 'image') {
											content = <img src={item.src} />
										}

										return (
											<div
												class="cell"
												style={
													this.columns[index]
														.overrideCSS
												}
											>
												{content}
											</div>
										)
									})}
								</div>
							)
						})}
					</div>
				</div>
			</Host>
		)
	}
}
