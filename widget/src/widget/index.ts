import { AnyObject } from "@type/types";
import * as EventTypes from "@constant/events";

const CONTACTLY_CONTAINER_ID = "contactly-container";
const CONTACTLY_IFRAME_ID = "contactly-iframe";
const CONTACTLY_IFRAME_URL = "http://localhost:4001/index.html";

const defaultStyles: AnyObject = {
    border: "none",
    "z-index": 2147483647,
    height: "650px",
    width: "350px",
    display: "block !important",
    visibility: "visible",
    background: "none transparent",
    opacity: 1,
    "pointer-events": "auto",
    "touch-action": "auto",
    position: "fixed",
    right: "20px",
    bottom: "20px",
};

export interface ISettings {
    readonly appId: string;
}

interface IWidget {
    iframe?: HTMLIFrameElement;
    settings?: ISettings;
    init: () => void;
    setupListeners: () => void;
    createIframe: () => void;
    receiveMessage: (event: MessageEvent) => void;
}

class Widget implements IWidget {
    iframe?: HTMLIFrameElement;

    settings?: ISettings;

    init = () => {
        this.settings = window.contactlySettings;
        this.createIframe();
        this.createContainer();
    };

    createContainer = () => {
        if (!document.getElementById(CONTACTLY_IFRAME_ID)) {
            this.setupListeners();

            // create a div container
            const container = document.createElement("div");
            container.id = CONTACTLY_CONTAINER_ID;
            const styles = `z-index: ${Number.MAX_SAFE_INTEGER}; width: 0; height: 0; position: relative;`;
            container.setAttribute("style", styles);

            // load iframe
            if (this.iframe) {
                container.appendChild(this.iframe);
            }
            document.body.appendChild(container);
        }
    };

    createIframe = () => {
        if (!document.getElementById(CONTACTLY_IFRAME_ID)) {
            const iframe = document.createElement("iframe");
            let styles = "";
            Object.keys(defaultStyles).forEach((key) => {
                styles += `${key}: ${defaultStyles[key]};`;
            });
            iframe.setAttribute("style", styles);
            iframe.src = CONTACTLY_IFRAME_URL;
            iframe.referrerPolicy = "origin";
            iframe.onload = () => {
                if (this.iframe?.contentWindow)
                    this.iframe.contentWindow.postMessage(
                        {
                            type: EventTypes.INIT_IFRAME,
                            value: {
                                appId: this.settings?.appId,
                                host: window.location.host,
                            },
                        },
                        "*",
                    );
            };
            this.iframe = iframe;
        }
    };

    setupListeners() {
        window.addEventListener("message", this.receiveMessage, false);
    }

    receiveMessage = (event: MessageEvent) => {
        if (event?.data?.type) {
            switch (event.data.type) {
                case EventTypes.INIT_IFRAME:
                    document.cookie = event.data.value;
                    break;
                default:
                    break;
            }
        }
    };
}

const ContactlyWidget = () => {
    const widget = new Widget();
    widget.init();
};

export default ContactlyWidget();
