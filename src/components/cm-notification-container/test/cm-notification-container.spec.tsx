import { newSpecPage } from '@stencil/core/testing'
import { CmNotificationContainer } from '../cm-notification-container'

describe('cm-notification-container', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [CmNotificationContainer],
			html: `<cm-notification-container></cm-notification-container>`,
		})
		expect(page.root).toEqualHtml(`
			<cm-notification-container>
				<mock:shadow-root>
					<slot></slot>
				</mock:shadow-root>
			</cm-notification-container>
		`)
	})
})
