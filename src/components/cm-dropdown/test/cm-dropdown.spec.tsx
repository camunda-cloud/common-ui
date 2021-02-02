import { newSpecPage } from '@stencil/core/testing'
import { CmDropdown } from '../cm-dropdown'

describe('cm-dropdown', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [CmDropdown],
			html: `<cm-dropdown></cm-dropdown>`,
		})
		expect(page.root).toEqualHtml(`
			<cm-dropdown>
				<mock:shadow-root>
					<slot></slot>
				</mock:shadow-root>
			</cm-dropdown>
		`)
	})
})
