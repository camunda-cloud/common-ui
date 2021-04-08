import { newSpecPage } from '@stencil/core/testing'
import { CmCheckbox } from '../cm-checkbox'

describe('cm-checkbox', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [CmCheckbox],
			html: `<cm-checkbox></cm-checkbox>`,
		})
		expect(page.root).toEqualHtml(`
			<cm-checkbox label="">
				<mock:shadow-root>
					<div tabindex="0" class="checkbox" role="checkbox"></div>
					<label></label>
				</mock:shadow-root>
			</cm-checkbox>
		`)
	})
})
