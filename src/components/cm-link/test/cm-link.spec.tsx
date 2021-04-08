import { newSpecPage } from '@stencil/core/testing'
import { CmLink } from '../cm-link'

describe('cm-link', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [CmLink],
			html: `<cm-link></cm-link>`,
		})
		expect(page.root).toEqualHtml(`
			<cm-link>
				<mock:shadow-root>
					<a href="" target="_blank" class="Light"></a>
				</mock:shadow-root>
			</cm-link>
		`)
	})
})
