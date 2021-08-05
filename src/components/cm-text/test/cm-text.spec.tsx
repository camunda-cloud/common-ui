import { newSpecPage } from '@stencil/core/testing'
import { CmText } from '../cm-text'

describe('cm-text', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [CmText],
			html: `<cm-text></cm-text>`,
		})
		expect(page.root).toEqualHtml(`
			<cm-text>
				<mock:shadow-root>
					<span class="Light bright normal">
						<slot></slot>
					</span>
				</mock:shadow-root>
			</cm-text>
		`)
	})
})
