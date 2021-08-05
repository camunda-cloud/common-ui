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
						<div class="Light container hasTimeOrNavigationLabel isUserDismissable" role="alert">
							<div class="icon info"></div>
							<div class="content">
								<div class="headline"></div>
								<div class="description"></div>
							</div>
							<cm-icon-button color="medium" icon="close" ignoretheme=""></cm-icon-button>
							<div class="date">
								Just now
							</div>
						</div>
					</div>
				</mock:shadow-root>
			</cm-notification>
		`)
	})
})
