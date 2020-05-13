import { newSpecPage } from '@stencil/core/testing'
import { CmButton } from '../cm-button'

describe('cm-button', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [CmButton],
			html: `<cm-button></cm-button>`,
		})
		expect(page.root).toEqualHtml(`
			<cm-button>
				<mock:shadow-root>
					<div tabindex="0" class="main"></div>
				</mock:shadow-root>
			</cm-button>
		`)
	})
})
