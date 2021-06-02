import { addParameters } from '@storybook/react'

addParameters({
	viewMode: 'docs',
	options: {
		storySort: {
			order: [
				'Introduction',
				'Components',
				[
					'Layout',
					['Header', 'Page', '*', 'Footer'],
					'Structural',
					'Interactive',
					['Button', 'IconButton', '*'],
					'Visual',
					['Text', 'Link', 'Icon'],
					'*',
					'Miscellaneous',
				],
			],
		},
	},
})
