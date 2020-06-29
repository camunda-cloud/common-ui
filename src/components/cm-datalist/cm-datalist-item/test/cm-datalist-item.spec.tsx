import { newSpecPage } from '@stencil/core/testing'
import { CmDatalistItem } from '../cm-datalist-item'

describe('cm-datalist-item', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [CmDatalistItem],
			html: `<cm-datalist-item></cm-datalist-item>`,
		})
		expect(page.root).toEqualHtml(`
			<cm-datalist-item>
				<mock:shadow-root>
					<slot></slot>
				</mock:shadow-root>
			</cm-datalist-item>
		`)
	})
})
