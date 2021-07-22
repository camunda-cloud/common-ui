import { newSpecPage } from '@stencil/core/testing'
import { CmIconButton } from '../cm-icon-button'

describe('cm-icon-button', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [CmIconButton],
			html: `<cm-icon-button icon="contextMenu"></cm-icon-button>`,
		})
		expect(page.root).toEqualHtml(`
			<cm-icon-button icon="contextMenu">
				<mock:shadow-root>
					<div aria-label="contextMenu" role="button" tabindex="0">
						<cm-icon icon="contextMenu"></cm-icon>
					</div>
				</mock:shadow-root>
			</cm-icon-button>
		`)
	})
})
