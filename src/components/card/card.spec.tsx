import { newSpecPage } from '@stencil/core/testing'
import { Card } from './card'

describe('cm-card', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [Card],
			html: `<cm-card></cm-card>`,
		})
		expect(page.root).toEqualHtml(`
			<cm-card>
				<mock:shadow-root>
					<div class="complex">
						<div class="headlineContainer empty">
							<span class="headline"></span>
							<div class="headlineSlot">
								<slot name="headline"></slot>
							</div>
						</div>
						<div class="content">
							<slot />
						</div>
					</div>
				</mock:shadow-root>
			</cm-card>
		`)
	})
})
