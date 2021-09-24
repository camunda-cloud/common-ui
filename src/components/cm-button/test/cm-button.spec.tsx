import { h } from '@stencil/core'
import { newSpecPage } from '@stencil/core/testing'
import { CmButton } from '../cm-button'

describe('cm-button', () => {
	it('renders primary button', async () => {
		const page = await newSpecPage({
			components: [CmButton],
			template: () => (
				<cm-button appearance="primary" label="Test"></cm-button>
			),
		})
		expect(page.root).toEqualHtml(`
			<cm-button>
				<mock:shadow-root>
					<div class="Light initialRender primary normal" role="button" tabindex="0">
						<cm-loader color="light" size="small"></cm-loader>
						<span>Test</span>
					</div>
				</mock:shadow-root>
			</cm-button>
		`)
	})

	it('renders secondary button', async () => {
		const page = await newSpecPage({
			components: [CmButton],
			template: () => (
				<cm-button appearance="secondary" label="Test"></cm-button>
			),
		})
		expect(page.root).toEqualHtml(`
			<cm-button>
				<mock:shadow-root>
					<div class="Light initialRender secondary normal" role="button" tabindex="0">
						<cm-loader color="dark" size="small"></cm-loader>
						<span>Test</span>
					</div>
				</mock:shadow-root>
			</cm-button>
		`)
	})

	it('renders link button', async () => {
		const page = await newSpecPage({
			components: [CmButton],
			template: () => (
				<cm-button appearance="link" label="Test"></cm-button>
			),
		})
		expect(page.root).toEqualHtml(`
			<cm-button>
				<mock:shadow-root>
					<div class="Light initialRender link normal" role="button" tabindex="0">
						<cm-loader color="dark" size="small"></cm-loader>
						<span>Test</span>
					</div>
				</mock:shadow-root>
			</cm-button>
		`)
	})

	it('renders main button', async () => {
		const page = await newSpecPage({
			components: [CmButton],
			template: () => (
				<cm-button appearance="main" label="Test"></cm-button>
			),
		})
		expect(page.root).toEqualHtml(`
			<cm-button>
				<mock:shadow-root>
					<div class="Light initialRender main normal" role="button" tabindex="0">
						<cm-loader color="dark" size="small"></cm-loader>
						<span>Test</span>
					</div>
				</mock:shadow-root>
			</cm-button>
		`)
	})

	it('renders danger button', async () => {
		const page = await newSpecPage({
			components: [CmButton],
			template: () => (
				<cm-button appearance="danger" label="Test"></cm-button>
			),
		})
		expect(page.root).toEqualHtml(`
			<cm-button>
				<mock:shadow-root>
					<div class="Light initialRender danger normal" role="button" tabindex="0">
						<cm-loader color="light" size="small"></cm-loader>
						<span>Test</span>
					</div>
				</mock:shadow-root>
			</cm-button>
		`)
	})

	it('renders disabled button', async () => {
		const page = await newSpecPage({
			components: [CmButton],
			template: () => (
				<cm-button appearance="main" disabled label="Test"></cm-button>
			),
		})
		expect(page.root).toEqualHtml(`
			<cm-button>
				<mock:shadow-root>
					<div aria-disabled="" class="Light disabled initialRender main normal" role="button" tabindex="-1">
						<cm-loader color="dark" size="small"></cm-loader>
						<span>Test</span>
					</div>
				</mock:shadow-root>
			</cm-button>
		`)
	})

	it('renders small button', async () => {
		const page = await newSpecPage({
			components: [CmButton],
			template: () => (
				<cm-button
					appearance="main"
					label="Test"
					size="small"
				></cm-button>
			),
		})
		expect(page.root).toEqualHtml(`
			<cm-button>
				<mock:shadow-root>
					<div class="Light initialRender main small" role="button" tabindex="0">
						<cm-loader color="dark" size="small"></cm-loader>
						<span>Test</span>
					</div>
				</mock:shadow-root>
			</cm-button>
		`)
	})

	it('renders loading button', async () => {
		const page = await newSpecPage({
			components: [CmButton],
			template: () => (
				<cm-button appearance="main" label="Test" loading></cm-button>
			),
		})
		expect(page.root).toEqualHtml(`
			<cm-button>
				<mock:shadow-root>
					<div class="Light initialRender loading main normal" role="button" tabindex="0">
						<cm-loader color="dark" size="small"></cm-loader>
						<span>Test</span>
					</div>
				</mock:shadow-root>
			</cm-button>
		`)
	})
})
