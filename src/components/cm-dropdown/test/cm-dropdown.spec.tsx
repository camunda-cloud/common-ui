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
					<div class="container">
						<div class="trigger">
							<div class="button main" tabindex="0">
								<cm-icon color="dark" icon="down" ignoreTheme=""></cm-icon>
							</div>
						</div>
						<div class="flyout" style="top: 10px; right: NaNpx;"></div>
					</div>
				</mock:shadow-root>
			</cm-dropdown>
		`)
	})
})
