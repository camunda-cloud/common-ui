import { newSpecPage } from '@stencil/core/testing'
import { CmLogo } from '../cm-logo'

describe('cm-logo', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [CmLogo],
			html: `<cm-logo></cm-logo>`,
		})
		expect(page.root).toEqualHtml(`
			<cm-logo>
				<mock:shadow-root>
					<div class="Light logo"></div>
				</mock:shadow-root>
			</cm-logo>
		`)
	})
})
