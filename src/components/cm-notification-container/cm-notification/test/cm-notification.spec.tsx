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
					<slot></slot>
				</mock:shadow-root>
			</cm-notification>
		`)
	})
})
