import { newSpecPage } from '@stencil/core/testing'
import { CmIcon } from '../cm-icon'

describe('cm-icon', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [CmIcon],
			html: `<cm-icon></cm-icon>`,
		})
		expect(page.root).toEqualHtml(`
			<cm-icon>
				<mock:shadow-root>
					<slot></slot>
				</mock:shadow-root>
			</cm-icon>
		`)
	})
})
