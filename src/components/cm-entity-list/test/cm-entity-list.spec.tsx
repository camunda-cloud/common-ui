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
					<slot></slot>
				</mock:shadow-root>
			</cm-entity-list>
		`)
	})
})
