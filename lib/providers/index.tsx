"use client";

import * as React from "react";

import HeroUiProvider from "./HeroUiProvider";
import ReactQueryProvider from "./ReactQueryProvider";
import { NotificationProvider } from "./NotificationProvider";
import GoogleProvider from "./GoogleOAuthProvider";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <GoogleProvider>
      <ReactQueryProvider>
        <NotificationProvider />
        <HeroUiProvider
          themeProps={{ attribute: "class", defaultTheme: "dark" }}
        >
          {children}
        </HeroUiProvider>
      </ReactQueryProvider>
    </GoogleProvider>
  );
};

export default Providers;
