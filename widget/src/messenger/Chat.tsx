import React, { useState, useCallback } from "react";

import { ThemeProvider } from "@contactly-ui/theme";
import { IconButton } from "@contactly-ui/button";
import { Flex } from "@contactly-ui/flex";

import * as EventTypes from "@constants/events";

import PoweredCard from "@components/PoweredCard/PoweredCard";

const App: React.FC = () => {
    return (
        <ThemeProvider>
            <PoweredCard>
                <div></div>
            </PoweredCard>
        </ThemeProvider>
    );
};

export default App;
