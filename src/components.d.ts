/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface CmButton {
        "appearance": "main" | "primary" | "secondary" | "danger";
        "disabled": boolean;
        "label": string;
    }
    interface CmFooter {
        "text": string;
    }
    interface CmHeader {
    }
    interface CmLink {
        "href": string;
        "label": string;
        "openIn": "sameTab" | "newTab";
    }
    interface CmLogo {
    }
    interface CmText {
    }
}
declare global {
    interface HTMLCmButtonElement extends Components.CmButton, HTMLStencilElement {
    }
    var HTMLCmButtonElement: {
        prototype: HTMLCmButtonElement;
        new (): HTMLCmButtonElement;
    };
    interface HTMLCmFooterElement extends Components.CmFooter, HTMLStencilElement {
    }
    var HTMLCmFooterElement: {
        prototype: HTMLCmFooterElement;
        new (): HTMLCmFooterElement;
    };
    interface HTMLCmHeaderElement extends Components.CmHeader, HTMLStencilElement {
    }
    var HTMLCmHeaderElement: {
        prototype: HTMLCmHeaderElement;
        new (): HTMLCmHeaderElement;
    };
    interface HTMLCmLinkElement extends Components.CmLink, HTMLStencilElement {
    }
    var HTMLCmLinkElement: {
        prototype: HTMLCmLinkElement;
        new (): HTMLCmLinkElement;
    };
    interface HTMLCmLogoElement extends Components.CmLogo, HTMLStencilElement {
    }
    var HTMLCmLogoElement: {
        prototype: HTMLCmLogoElement;
        new (): HTMLCmLogoElement;
    };
    interface HTMLCmTextElement extends Components.CmText, HTMLStencilElement {
    }
    var HTMLCmTextElement: {
        prototype: HTMLCmTextElement;
        new (): HTMLCmTextElement;
    };
    interface HTMLElementTagNameMap {
        "cm-button": HTMLCmButtonElement;
        "cm-footer": HTMLCmFooterElement;
        "cm-header": HTMLCmHeaderElement;
        "cm-link": HTMLCmLinkElement;
        "cm-logo": HTMLCmLogoElement;
        "cm-text": HTMLCmTextElement;
    }
}
declare namespace LocalJSX {
    interface CmButton {
        "appearance"?: "main" | "primary" | "secondary" | "danger";
        "disabled"?: boolean;
        "label"?: string;
        "onCmPress"?: (event: CustomEvent<{}>) => void;
    }
    interface CmFooter {
        "text"?: string;
    }
    interface CmHeader {
    }
    interface CmLink {
        "href"?: string;
        "label"?: string;
        "openIn"?: "sameTab" | "newTab";
    }
    interface CmLogo {
    }
    interface CmText {
    }
    interface IntrinsicElements {
        "cm-button": CmButton;
        "cm-footer": CmFooter;
        "cm-header": CmHeader;
        "cm-link": CmLink;
        "cm-logo": CmLogo;
        "cm-text": CmText;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "cm-button": LocalJSX.CmButton & JSXBase.HTMLAttributes<HTMLCmButtonElement>;
            "cm-footer": LocalJSX.CmFooter & JSXBase.HTMLAttributes<HTMLCmFooterElement>;
            "cm-header": LocalJSX.CmHeader & JSXBase.HTMLAttributes<HTMLCmHeaderElement>;
            "cm-link": LocalJSX.CmLink & JSXBase.HTMLAttributes<HTMLCmLinkElement>;
            "cm-logo": LocalJSX.CmLogo & JSXBase.HTMLAttributes<HTMLCmLogoElement>;
            "cm-text": LocalJSX.CmText & JSXBase.HTMLAttributes<HTMLCmTextElement>;
        }
    }
}
