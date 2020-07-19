import { newSpecPage } from '@stencil/core/testing'
import { CmDatalist } from '../cm-datalist'

describe('cm-datalist', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [CmDatalist],
			html: `<cm-datalist></cm-datalist>`,
		})
		expect(page.root).toEqualHtml(`
			<cm-datalist>
				<mock:shadow-root>
					<h1></h1>
					<div class="items">
						<slot></slot>
					</div>
				</mock:shadow-root>
			</cm-datalist>
		`)
	})
})
