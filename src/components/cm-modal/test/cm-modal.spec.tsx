import { newSpecPage } from '@stencil/core/testing'
import { CmModal } from '../cm-modal'

describe('cm-modal', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [CmModal],
			html: `<cm-modal></cm-modal>`,
		})
		expect(page.root).toEqualHtml(`
			<cm-modal tabindex="0">
				<mock:shadow-root>
					<div class="center container">
						<div class="window" style="width: 636px;">
							<div class="header">
								<h1></h1>
								<cm-icon-button icon="closeLarge"></cm-icon-button>
							</div>
							<div class="content paddings-all">
								<slot></slot>
							</div>
							<div class="buttons">
								<cm-button appearance="primary" label=""></cm-button>
							</div>
						</div>
					</div>
				</mock:shadow-root>
			</cm-modal>
		`)
	})
})
