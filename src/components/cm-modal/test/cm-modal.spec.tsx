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
						<div class="window">
							<div class="header">
								<h1></h1>
								<cm-icon-button icon="closeLarge"></cm-icon-button>
							</div>
							<div class="content">
								<slot></slot>
							</div>
							<div class="buttons">
								<slot name="cancel"></slot>
								<slot name="confirm"></slot>
							</div>
						</div>
					</div>
				</mock:shadow-root>
			</cm-modal>
		`)
	})
})
