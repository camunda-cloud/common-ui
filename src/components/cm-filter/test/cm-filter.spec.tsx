import { newSpecPage } from '@stencil/core/testing'
import { CmFilter } from '../cm-filter'

describe('cm-filter', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [CmFilter],
			html: `<cm-filter></cm-filter>`,
		})
		expect(page.root).toEqualHtml(`
			<cm-filter>
				<mock:shadow-root>
					<div class="container"></div>
				</mock:shadow-root>
			</cm-filter>
		`)
	})
})
