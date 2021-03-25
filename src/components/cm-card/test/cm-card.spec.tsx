import { newSpecPage } from '@stencil/core/testing'
import { CmCard } from '../cm-card'

describe('cm-card', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [CmCard],
			html: `<cm-card></cm-card>`,
		})
		expect(page.root).toEqualHtml(`
			<cm-card>
				<mock:shadow-root>
					<slot></slot>
				</mock:shadow-root>
			</cm-card>
		`)
	})
})
