import { newSpecPage } from '@stencil/core/testing'
import { CmPageTab } from '../cm-page-tab'

describe('cm-page-tab', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [CmPageTab],
			html: `<cm-page-tab></cm-page-tab>`,
		})
		expect(page.root).toEqualHtml(`
			<cm-page-tab aria-hidden="" role="tabpanel">
				<mock:shadow-root>
					<slot></slot>
				</mock:shadow-root>
			</cm-page-tab>
		`)
	})
})
