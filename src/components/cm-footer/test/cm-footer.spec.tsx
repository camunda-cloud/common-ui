import { newSpecPage } from '@stencil/core/testing'
import { CmFooter } from '../cm-footer'

describe('cm-footer', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [CmFooter],
			html: `<cm-footer></cm-footer>`,
		})
		expect(page.root).toEqualHtml(`
			<cm-footer>
				<mock:shadow-root>
					<div class="footer Light"></div>
				</mock:shadow-root>
			</cm-footer>
		`)
	})
})
