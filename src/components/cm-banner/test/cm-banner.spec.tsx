import { newSpecPage } from '@stencil/core/testing'
import { CmBanner } from '../cm-banner'

describe('cm-banner', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [CmBanner],
			html: `<cm-banner></cm-banner>`,
		})

		expect(page.root).toEqualHtml(`
			<cm-banner>
				<mock:shadow-root>
					<div class="container">
						<div>
							<slot></slot>
						</div>
					</div>
				</mock:shadow-root>
			</cm-banner>
		`)
	})
})
