import{Component,Host,h,Prop,Listen,Event,State,Element,Method,Watch}from"@stencil/core";import{onThemeChange}from"../../globalHelpers";export class CmButton{constructor(){this.appearance="main",this.label="",this.size="normal",this.disabled=!1,this.loading=!1,this.theme="Light",this.initialRender=!0}disabledHandler(){this.disabled&&!this.initialRender&&this.el.shadowRoot.querySelector("span").classList.add("disabled")}async press(options={}){(!this.disabled&&(!this.loading||this.loading&&"link"===this.appearance)||options.forcePress)&&this.cmPress.emit()}handleClick(){this.disabled||this.loading&&(!this.loading||"link"!==this.appearance)||this.press()}handleKeyDown(event){" "!==event.key&&"Enter"!==event.key||this.disabled||this.loading&&(!this.loading||"link"!==this.appearance)||this.press()}componentWillLoad(){onThemeChange((theme=>{this.theme=theme}))}componentDidRender(){requestAnimationFrame((()=>{this.initialRender=!1,this.disabled||this.el.shadowRoot.querySelector("span").classList.remove("disabled")}))}render(){let classes={[this.appearance]:!0,[this.theme]:!0,[this.size]:!0,initialRender:this.initialRender,disabled:this.disabled,loading:this.loading},tabIndex=0;return this.disabled&&(tabIndex=-1),h(Host,null,h("div",{tabindex:tabIndex,class:classes,role:"button","aria-disabled":this.disabled},h("cm-loader",{size:"small",color:"danger"===this.appearance||"primary"===this.appearance?"light":"dark"}),h("span",null,this.label)))}static get is(){return"cm-button"}static get encapsulation(){return"shadow"}static get originalStyleUrls(){return{$:["cm-button.scss"]}}static get styleUrls(){return{$:["cm-button.css"]}}static get properties(){return{appearance:{type:"string",mutable:!0,complexType:{original:"| 'main'\n\t\t| 'primary'\n\t\t| 'secondary'\n\t\t| 'danger'\n\t\t| 'link'",resolved:'"danger" | "link" | "main" | "primary" | "secondary"',references:{}},required:!1,optional:!1,docs:{tags:[],text:""},attribute:"appearance",reflect:!1,defaultValue:"'main'"},label:{type:"string",mutable:!0,complexType:{original:"string",resolved:"string",references:{}},required:!1,optional:!1,docs:{tags:[],text:""},attribute:"label",reflect:!1,defaultValue:"''"},size:{type:"string",mutable:!0,complexType:{original:"'small' | 'normal'",resolved:'"normal" | "small"',references:{}},required:!1,optional:!1,docs:{tags:[],text:""},attribute:"size",reflect:!1,defaultValue:"'normal'"},disabled:{type:"boolean",mutable:!0,complexType:{original:"boolean",resolved:"boolean",references:{}},required:!1,optional:!1,docs:{tags:[],text:""},attribute:"disabled",reflect:!1,defaultValue:"false"},loading:{type:"boolean",mutable:!0,complexType:{original:"boolean",resolved:"boolean",references:{}},required:!1,optional:!1,docs:{tags:[],text:"The loading state displays a spinner and effectively disables the button to user input. Does not affect buttons with the `link` appearance."},attribute:"loading",reflect:!1,defaultValue:"false"}}}static get states(){return{theme:{},initialRender:{}}}static get events(){return[{method:"cmPress",name:"cmPress",bubbles:!0,cancelable:!0,composed:!0,docs:{tags:[],text:"Emitted when the button is pressed or either Spacebar or Enter are being pressed when the button is focused."},complexType:{original:"{}",resolved:"{}",references:{}}}]}static get methods(){return{press:{complexType:{signature:"(options?: { forcePress?: boolean; }) => Promise<void>",parameters:[{tags:[],text:""}],references:{Promise:{location:"global"}},return:"Promise<void>"},docs:{text:"Triggers the press event. Respects the disabled state unless forced.",tags:[]}}}}static get elementRef(){return"el"}static get watchers(){return[{propName:"disabled",methodName:"disabledHandler"}]}static get listeners(){return[{name:"click",method:"handleClick",target:void 0,capture:!1,passive:!1},{name:"keydown",method:"handleKeyDown",target:void 0,capture:!1,passive:!1}]}}