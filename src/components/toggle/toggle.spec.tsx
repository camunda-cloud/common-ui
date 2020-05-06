import { newSpecPage } from '@stencil/core/testing'
import { Toggle } from './toggle'

describe('cm-toggle', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [Toggle],
			html: `<cm-toggle></cm-toggle>`,
		})
		expect(page.root).toEqualHtml(`
			<cm-toggle>
				<mock:shadow-root>
					<div tabindex="0" class="toggle"></div>
					<label></label>
				</mock:shadow-root>
			</cm-toggle>
		`)
	})
})
