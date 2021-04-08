import { newSpecPage } from '@stencil/core/testing'
import { CmIconButton } from '../cm-icon-button'

describe('cm-icon-button', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [CmIconButton],
			html: `<cm-icon-button icon="contextMenu" ></cm-icon-button>`,
		})
		expect(page.root).toEqualHtml(`
			<cm-icon-button aria-label="contextMenu" icon="contextMenu" tabindex="0" role="button">
				<mock:shadow-root>
					<cm-icon icon="contextMenu"></cm-icon>
				</mock:shadow-root>
			</cm-icon-button>
		`)
	})
})
