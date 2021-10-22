import { newSpecPage } from '@stencil/core/testing'
import { CmPage } from '../cm-page'

import MutationObserver from 'mutation-observer'
global.MutationObserver = MutationObserver

describe('cm-page', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [CmPage],
			html: `<cm-page></cm-page>`,
		})
		expect(page.root).toEqualHtml(`
			<cm-page>
				<mock:shadow-root>
					<header class="empty">
						<div class="headerSlot">
							<slot name="header"></slot>
						</div>
						<div class="empty handles"></div>
					</header>
					<div class="Light tabs">
						<slot></slot>
					</div>
				</mock:shadow-root>
			</cm-page>
		`)
	})
})
