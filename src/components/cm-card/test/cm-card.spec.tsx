import { newSpecPage } from '@stencil/core/testing'
import { CmCard } from '../cm-card'
import { h } from '@stencil/core'

describe('cm-card', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [CmCard],
			html: `<cm-card></cm-card>`,
		})
		expect(page.root).toEqualHtml(`
			<cm-card>
				<mock:shadow-root>
					<div class="container">
						<slot name="header"></slot>
						<div class="content">
							<slot></slot>
						</div>
						<slot name="footer"></slot>
					</div>
				</mock:shadow-root>
			</cm-card>
		`)
	})

	it('has dismiss button', async () => {
		const page = await newSpecPage({
			components: [CmCard],
			template: () => <cm-card isDismissable={true}></cm-card>,
		})
		expect(page.root).toEqualHtml(`
			<cm-card>
				<mock:shadow-root>
					<div class="container">
						<slot name="header"></slot>
						<div class="content">
							<slot></slot>
						</div>
						<slot name="footer"></slot>
						<cm-icon-button icon="closeLarge" id="dismissButton"></cm-icon-button>
					</div>
				</mock:shadow-root>
			</cm-card>
		`)
	})
})
