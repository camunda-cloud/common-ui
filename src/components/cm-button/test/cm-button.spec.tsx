import { newSpecPage } from '@stencil/core/testing'
import { CmButton } from '../cm-button'

describe('cm-button', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [CmButton],
			html: `<cm-button></cm-button>`,
		})
		expect(page.root).toEqualHtml(`
			<cm-button tabindex="0" class="main">
				<mock:shadow-root>
				</mock:shadow-root>
			</cm-button>
		`)
	})
})
