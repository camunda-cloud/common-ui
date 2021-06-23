import { newSpecPage } from '@stencil/core/testing'
import { CmButton } from '../cm-button'

describe('cm-button', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [CmButton],
			html: `<cm-button></cm-button>`,
		})
		expect(page.root).toEqualHtml(`
			<cm-button>
				<mock:shadow-root>
					<div class="Light initialRender main normal" role="button" tabindex="0">
						<cm-loader color="dark" size="small"></cm-loader>
						<span></span>
					</div>
				</mock:shadow-root>
			</cm-button>
		`)
	})
})
