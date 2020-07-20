import { newSpecPage } from '@stencil/core/testing'
import { CmIconButton } from '../cm-icon-button'

describe('cm-button', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [CmIconButton],
			html: `<cm-icon-button icon="contextMenu" ></cm-icon-button>`,
		})
		expect(page.root).toEqualHtml(`
			<cm-icon-button class="contextMenu" icon="contextMenu" tabindex="0">
				<mock:shadow-root>
					<div></div>
				</mock:shadow-root>
			</cm-icon-button>
		`)
	})
})
