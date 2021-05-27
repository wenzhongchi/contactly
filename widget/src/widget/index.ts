import { AnyObject } from "@type/types";
import * as EventTypes from "@constants/events";

const CONTACTLY_CONTAINER_ID = "contactly-container";
const CONTACTLY_IFRAME_LAUNCHER_ID = "contactly-iframe-launcher";
const CONTACTLY_IFRAME_LAUNCHER_URL = "http://localhost:4001/index.html";
const CONTACTLY_IFRAME_MESSENGER_ID = "contactly-iframe-messenger";
const CONTACTLY_IFRAME_MESSENGER_URL = "http://localhost:4002/index.html";

const launcherStyles: AnyObject = {
    border: "none",
    "z-index": 2147483646,
    height: "250px",
    width: "400px",
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

const messengerStyles: AnyObject = {
    border: "none",
    "z-index": 2147483647,
    height: "250px",
    width: "400px",
    display: "block !important",
    visibility: "visible",
    background: "none transparent",
    opacity: 1,
    "pointer-events": "auto",
    "touch-action": "auto",
    position: "fixed",
    right: "20px",
    bottom: "120px",
};

export interface ISettings {
    readonly appId: string;
}

interface IWidget {
    iframe?: HTMLIFrameElement;
    settings?: ISettings;
    init: () => void;
    setupListeners: () => void;
    createLauncher: () => void;
    createMessenger: () => void;
    receiveMessage: (event: MessageEvent) => void;
}

class Widget implements IWidget {
    launcherIframe?: HTMLIFrameElement;
    messengerIframe?: HTMLIFrameElement;
    container?: HTMLDivElement;

    settings?: ISettings;

    init = () => {
        this.settings = window.contactlySettings;
        this.createLauncher();
        this.createContainer();
    };

    createContainer = () => {
        if (!document.getElementById(CONTACTLY_IFRAME_LAUNCHER_ID)) {
            this.setupListeners();

            // create a div container
            const container = document.createElement("div");
            container.id = CONTACTLY_CONTAINER_ID;
            const styles = `z-index: ${Number.MAX_SAFE_INTEGER}; width: 0; height: 0; position: relative;`;
            container.setAttribute("style", styles);

            // load iframe
            if (this.launcherIframe) {
                container.appendChild(this.launcherIframe);
            }
            document.body.appendChild(container);

            this.container = container;
        }
    };

    createLauncher = () => {
        if (!document.getElementById(CONTACTLY_IFRAME_LAUNCHER_ID)) {
            const iframe = document.createElement("iframe");
            let styles = "";
            Object.keys(launcherStyles).forEach((key) => {
                styles += `${key}: ${launcherStyles[key]};`;
            });
            iframe.setAttribute("style", styles);
            iframe.src = CONTACTLY_IFRAME_LAUNCHER_URL;
            iframe.referrerPolicy = "origin";
            iframe.onload = () => {
                if (this.launcherIframe?.contentWindow)
                    this.launcherIframe.contentWindow.postMessage(
                        {
                            type: EventTypes.INIT_LAUNCHER_IFRAME,
                            value: {
                                appId: this.settings?.appId,
                                host: window.location.host,
                            },
                        },
                        "*",
                    );
            };
            this.launcherIframe = iframe;
        }
    };

    createMessenger = () => {
        if (!document.getElementById(CONTACTLY_IFRAME_MESSENGER_ID)) {
            const iframe = document.createElement("iframe");
            let styles = "";
            Object.keys(messengerStyles).forEach((key) => {
                styles += `${key}: ${messengerStyles[key]};`;
            });
            iframe.setAttribute("style", styles);
            iframe.src = CONTACTLY_IFRAME_MESSENGER_URL;
            iframe.referrerPolicy = "origin";
            iframe.onload = () => {
                if (this.messengerIframe?.contentWindow)
                    this.messengerIframe.contentWindow.postMessage(
                        {
                            type: EventTypes.OPEN_MESSENGER_IFRAME,
                            value: {
                                appId: this.settings?.appId,
                                host: window.location.host,
                            },
                        },
                        "*",
                    );
            };
            this.messengerIframe = iframe;

            if (this.messengerIframe) {
                this.container?.appendChild(this.messengerIframe);
            }
        }
    };

    setupListeners() {
        window.addEventListener("message", this.receiveMessage, false);
    }

    receiveMessage = (event: MessageEvent) => {
        if (event?.data?.type) {
            switch (event.data.type) {
                case EventTypes.INIT_LAUNCHER_IFRAME:
                    document.cookie = event.data.value;
                    break;
                case EventTypes.OPEN_MESSENGER_IFRAME:
                    this.createMessenger();
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
