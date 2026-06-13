"use client";

import * as React from "react";

import HeroUiProvider from "./HeroUiProvider";
import ReactQueryProvider from "./ReactQueryProvider";
import { NotificationProvider } from "./NotificationProvider";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <ReactQueryProvider>
      <NotificationProvider />
      <HeroUiProvider themeProps={{ attribute: "class", defaultTheme: "dark" }}>
        {children}
      </HeroUiProvider>
    </ReactQueryProvider>
  );
};

export default Providers;
