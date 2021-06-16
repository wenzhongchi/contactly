import { createMedia } from "@artsy/fresnel";
import _ from "lodash";

import { themes } from "@contactly-ui/theme";

const getBreakpointNumber = (point: string): number =>
    Number(_.get(themes.light.breakpoints, point, "0px").replace("px", ""));

const AppMedia = createMedia({
    breakpoints: {
        xs: getBreakpointNumber("xs"),
        sm: getBreakpointNumber("sm"),
        md: getBreakpointNumber("md"),
        lg: getBreakpointNumber("lg"),
        xl: getBreakpointNumber("xl"),
    },
});

export const mediaStyles = AppMedia.createMediaStyle();

export const { Media, MediaContextProvider } = AppMedia;
