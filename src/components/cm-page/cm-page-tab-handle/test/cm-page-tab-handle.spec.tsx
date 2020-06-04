import { newSpecPage } from '@stencil/core/testing'
import { CmPageTabHandle } from '../cm-page-tab-handle'

describe('cm-page-tab-handle', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [CmPageTabHandle],
			html: `<cm-page-tab-handle></cm-page-tab-handle>`,
		})
		expect(page.root).toEqualHtml(`
			<cm-page-tab-handle>
				<mock:shadow-root>
				<slot></slot>
				</mock:shadow-root>
			</cm-page-tab-handle>
		`)
	})
})
