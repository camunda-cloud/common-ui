const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin')

module.exports = {
	core: {
		builder: 'webpack5',
	},
	stories: ['../src/**/*.stories.mdx'],
	addons: ['@storybook/addon-docs'],
	webpackFinal: (config) => {
		config.entry.push(
			path.join(__dirname, '../dist/common-ui/common-ui.css'),
		)

		config.plugins.push(
			new CopyPlugin({
				patterns: [
					{
						from: '**/*',
						to: './',
						context: 'dist',
					},
				],
			}),
		)

		config.plugins.push(new WriteFilePlugin())

		return config
	},
}
