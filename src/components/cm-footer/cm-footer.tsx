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
	tag: 'cm-footer',
	styleUrl: 'cm-footer.scss',
	shadow: true,
})
export class CmFooter implements ComponentInterface {
	@State() theme: Theme = 'Light'
	@Prop({ mutable: true }) text: string = ''

	componentWillLoad() {
		onThemeChange((theme) => {
			this.theme = theme
		})
	}

	render() {
		return (
			<Host>
				<div class={{ footer: true, [this.theme]: true }}>
					{this.text}
				</div>
			</Host>
		)
	}
}
