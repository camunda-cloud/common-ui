import{r as e,c as o,h as t,H as i,g as r}from"./p-dace1eaf.js";const a=class{constructor(t){e(this,t),this.cmInput=o(this,"cmInput",7),this.disabled=!1,this.options=[]}async selectOptionByIndex(e){this.disabled&&!e.forceSelection||(this.element.shadowRoot.querySelector("select").selectedIndex=e.selectedIndex)}inputHandler(e){let o=e.target;this.cmInput.emit({newValue:o.options[o.selectedIndex].value})}render(){let e={disabled:this.disabled},o=[];for(let e of this.options)o.push(t("option",{value:e.value},e.label));return t(i,null,t("div",{class:e},t("select",{onInput:this.inputHandler.bind(this)},o)))}get element(){return r(this)}};a.style="div{display:inline-block;position:relative}div::before{pointer-events:none;content:\"\";position:absolute;right:10px;top:50%;transform:translateY(-50%);background-image:url(\"data:image/svg+xml,%3Csvg width='10' height='7' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4.95 6.9L0 1.95 1.414.536 4.95 4.07 8.485.536 9.9 1.95 4.95 6.9z' fill='%233B3B3B' fill-rule='evenodd'/%3E%3C/svg%3E\");background-repeat:no-repeat;width:10px;height:7px;transition:0.2s all linear;opacity:0.6}div.disabled{pointer-events:none}div.disabled::before{opacity:0.5}div.disabled select{color:var(--cm-color-ui-light3)}div:hover::before{opacity:0.8}div:active::before{opacity:1}select{-moz-appearance:none;-webkit-appearance:none;appearance:none;box-sizing:border-box;height:30px;background:var(--cm-color-ui-light4);border:1px solid var(--cm-color-ui-light3);border-radius:3px;padding:5px 30px 5px 10px;color:var(--cm-color-ui-dark4);font-family:var(--cm-font-text);font-size:14px;transition:0.2s all linear}select:focus{outline:none;box-shadow:0px 0px 0px 1px var(--cm-color-focus-inner-neutral), 0px 0px 0px 4px var(--cm-color-focus-outer-neutral)}select:hover{background:var(--cm-color-ui-light2);border-color:var(--cm-color-ui-light3)}select:active{background:var(--cm-color-ui-light1)}";export{a as cm_select};