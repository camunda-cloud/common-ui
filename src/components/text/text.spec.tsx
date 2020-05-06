import { newSpecPage } from '@stencil/core/testing'
import { Text } from './text'

describe('cm-text', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [Text],
			html: `<cm-text></cm-text>`,
		})
		expect(page.root).toEqualHtml(`
			<cm-text>
				<mock:shadow-root>
					<span class="">
						<slot></slot>
					</span>
				</mock:shadow-root>
			</cm-text>
		`)
	})
})
