import { newSpecPage } from '@stencil/core/testing'
import { CmNotification } from '../cm-notification'

describe('cm-notification', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [CmNotification],
			html: `<cm-notification></cm-notification>`,
		})
		expect(page.root).toEqualHtml(`
			<cm-notification>
				<mock:shadow-root>
					<div class="shadowContainer">
						<div class="Light container" role="alert">
							<div class="icon info"></div>
							<div class="contentContainer">
								<div class="headlineWithoutDescription"></div>
							</div>
							<cm-icon-button icon="close"></cm-icon-button>
						</div>
					</div>
				</mock:shadow-root>
			</cm-notification>
		`)
	})
})
