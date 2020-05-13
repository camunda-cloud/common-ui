import { newSpecPage } from '@stencil/core/testing'
import { CmHeader } from '../cm-header'

describe('cm-header', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [CmHeader],
			html: `<cm-header></cm-header>`,
		})
		expect(page.root).toEqualHtml(`
			<cm-header>
				<mock:shadow-root>
					<div class="header">
						<div class="left">
							<slot name="left"></slot>
						</div>
						<div class="right">
							<slot name="right"></slot>
						</div>
					</div>
				</mock:shadow-root>
			</cm-header>
		`)
	})
})
