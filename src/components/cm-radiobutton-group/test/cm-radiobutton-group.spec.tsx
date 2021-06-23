import { newSpecPage } from '@stencil/core/testing'
import { CmRadiobuttonGroup } from '../cm-radiobutton-group'

import MutationObserver from 'mutation-observer'
global.MutationObserver = MutationObserver

describe('cm-radiobutton-group', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [CmRadiobuttonGroup],
			html: `<cm-radiobutton-group></cm-radiobutton-group>`,
		})

		expect(page.root).toEqualHtml(`
			<cm-radiobutton-group>
				<mock:shadow-root>
					<slot></slot>
				</mock:shadow-root>
			</cm-radiobutton-group>
		`)
	})
})
