import { newSpecPage } from '@stencil/core/testing'
import { Link } from './link'

describe('cm-link', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [Link],
			html: `<cm-link></cm-link>`,
		})
		expect(page.root).toEqualHtml(`
			<cm-link>
				<mock:shadow-root>
					<a href="" target="_blank"></a>
				</mock:shadow-root>
			</cm-link>
		`)
	})
})
