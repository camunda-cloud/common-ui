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
				<div class="container" style="grid-template-columns: 250px 1fr">
					<span class="label"></span>
					<div class="content"></div>
				</div>
			</cm-datalist-item>
		`)
	})
})
