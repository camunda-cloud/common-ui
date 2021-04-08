import { newSpecPage } from '@stencil/core/testing'
import { CmDropdown } from '../cm-dropdown'

describe('cm-dropdown', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [CmDropdown],
			html: `<cm-dropdown></cm-dropdown>`,
		})
		expect(page.root).toEqualHtml(`
			<cm-dropdown>
				<mock:shadow-root>
					<div class="container" tabindex="0">
						<div class="trigger">
							<div class="button main">
								<cm-icon icon="down"></cm-icon>
							</div>
						</div>
						<div class="flyout"></div>
					</div>
				</mock:shadow-root>
			</cm-dropdown>
		`)
	})
})
