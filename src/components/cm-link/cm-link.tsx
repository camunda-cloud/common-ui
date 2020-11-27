import {
	Component,
	ComponentInterface,
	Host,
	h,
	Prop,
	State,
} from '@stencil/core'
import { onThemeChange, Theme } from '../../globalHelpers'

@Component({
	tag: 'cm-link',
	styleUrl: 'cm-link.scss',
	shadow: true,
})
export class CmLink implements ComponentInterface {
	@Prop() href: string = ''
	@Prop() label: string = ''
	@Prop() openIn: 'sameTab' | 'newTab' = 'newTab'
	@State() theme: Theme = 'Light'

	componentWillLoad() {
		onThemeChange((theme) => {
			this.theme = theme
		})
	}

	render() {
		let classes = {
			[this.theme]: true,
		}
		let target = ''

		if (this.openIn === 'newTab') {
			target = '_blank'
		}

		return (
			<Host>
				<a class={classes} target={target} href={this.href}>
					{this.label}
				</a>
			</Host>
		)
	}
}
