import { newSpecPage } from '@stencil/core/testing'
import { CmLoader } from '../cm-loader'

describe('cm-loader', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [CmLoader],
			html: `<cm-loader></cm-loader>`,
		})
		expect(page.root).toEqualHtml(`
			<cm-loader>
				<mock:shadow-root>
					<div class="normal spinner"></div>
				</mock:shadow-root>
			</cm-loader>
		`)
	})
})
