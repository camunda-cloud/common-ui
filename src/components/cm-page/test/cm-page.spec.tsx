import { newSpecPage } from '@stencil/core/testing'
import { CmPage } from '../cm-page'

describe('cm-page', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [CmPage],
			html: `<cm-page></cm-page>`,
		})
		expect(page.root).toEqualHtml(`
			<cm-page>
				<mock:shadow-root>
					<slot></slot>
				</mock:shadow-root>
			</cm-page>
		`)
	})
})
