import { newSpecPage } from '@stencil/core/testing'
import { CmCheckboxGroup } from '../cm-checkbox-group'

describe('cm-checkbox-group', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [CmCheckboxGroup],
			html: `<cm-checkbox-group></cm-checkbox-group>`,
		})
		expect(page.root).toEqualHtml(`
			<cm-checkbox-group>
				<mock:shadow-root>
					<div class="container">
						<slot></slot>
					</div>
				</mock:shadow-root>
			</cm-checkbox-group>
		`)
	})
})
