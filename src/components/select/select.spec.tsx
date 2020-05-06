import { newSpecPage } from '@stencil/core/testing'
import { Select } from './select'

describe('cm-select', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [Select],
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
