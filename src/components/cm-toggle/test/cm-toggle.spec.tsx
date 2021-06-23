import { newSpecPage } from '@stencil/core/testing'
import { CmToggle } from '../cm-toggle'

describe('cm-toggle', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [CmToggle],
			html: `<cm-toggle></cm-toggle>`,
		})
		expect(page.root).toEqualHtml(`
			<cm-toggle label="">
				<mock:shadow-root>
					<div class="container" tabindex="0">
						<div class="toggle" role="checkbox"></div>
						<label></label>
					</div>
				</mock:shadow-root>
			</cm-toggle>
		`)
	})
})
