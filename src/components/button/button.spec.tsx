import { newSpecPage } from '@stencil/core/testing'
import { Button } from './button'

describe('cm-button', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [Button],
			html: `<cm-button></cm-button>`,
		})
		expect(page.root).toEqualHtml(`
			<cm-button>
				<mock:shadow-root>
					<div tabindex="0" class="secondary"></div>
				</mock:shadow-root>
			</cm-button>
		`)
	})
})
