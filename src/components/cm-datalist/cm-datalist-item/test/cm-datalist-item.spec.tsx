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
				<span class="label"></span>
				<div class="content"></div>
			</cm-datalist-item>
		`)
	})
})
