import { newSpecPage } from '@stencil/core/testing'
import { CmSelect } from '../cm-select'

describe('cm-select', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [CmSelect],
			html: `<cm-select></cm-select>`,
		})
		expect(page.root).toEqualHtml(`
			<cm-select>
				<mock:shadow-root>
					<div>
						<select></select>
					</div>
				</mock:shadow-root>
			</cm-select>
		`)
	})
})
