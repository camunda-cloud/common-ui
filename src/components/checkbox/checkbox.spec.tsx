import { newSpecPage } from '@stencil/core/testing'
import { Checkbox } from './checkbox'

describe('cm-checkbox', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [Checkbox],
			html: `<cm-checkbox></cm-checkbox>`,
		})
		expect(page.root).toEqualHtml(`
			<cm-checkbox>
				<mock:shadow-root>
					<div tabindex="0" class="checkbox"></div>
					<label></label>
				</mock:shadow-root>
			</cm-checkbox>
		`)
	})
})
