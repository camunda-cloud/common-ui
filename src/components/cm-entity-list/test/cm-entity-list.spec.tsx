import { newSpecPage } from '@stencil/core/testing'
import { CmEntityList } from '../cm-entity-list'

describe('cm-entity-list', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [CmEntityList],
			html: `<cm-entity-list></cm-entity-list>`,
		})
		expect(page.root).toEqualHtml(`
			<cm-entity-list>
				<mock:shadow-root>
					<div class="container">
						<div class="header">
							<div class="headline"></div>
							<div class="buttons">
								<div class="search">
									<cm-icon-button icon="search"></cm-icon-button>
								</div>
								<cm-button appearance="primary" label=""></cm-button>
							</div>
						</div>
						<div class="entities">
							<div style="display: grid;">
								<slot name="empty"></slot>
							</div>
						</div>
					</div>
				</mock:shadow-root>
			</cm-entity-list>
		`)
	})
})
