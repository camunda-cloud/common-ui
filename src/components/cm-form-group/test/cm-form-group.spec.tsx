import { newSpecPage } from '@stencil/core/testing'
import { CmFormgroup } from '../cm-form-group'

describe('cm-form-group', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [CmFormgroup],
			html: `<cm-form-group></cm-form-group>`,
		})
		expect(page.root).toEqualHtml(`
			<cm-form-group>
				<mock:shadow-root>
					<div class="container">
						<slot></slot>
					</div>
				</mock:shadow-root>
			</cm-form-group>
		`)
	})
})
