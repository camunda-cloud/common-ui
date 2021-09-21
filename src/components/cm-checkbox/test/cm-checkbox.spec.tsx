import { newSpecPage } from '@stencil/core/testing'
import { CmCheckbox } from '../cm-checkbox'

describe('cm-checkbox', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [CmCheckbox],
			html: `<cm-checkbox></cm-checkbox>`,
		})
		expect(page.root).toEqualHtml(`
			<cm-checkbox form-name="" helper-text="" label="">
				<mock:shadow-root>
					<div class="container" tabindex="0">
						<div class="checkbox" role="checkbox"></div>
						<label></label>
						<cm-text appearance="helperText" color="subtle"></cm-text>
						<div class="errorMessage"></div>
					</div>
				</mock:shadow-root>
			</cm-checkbox>
		`)
	})
})
