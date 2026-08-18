"use client";

import * as React from "react";

import HeroUiProvider from "./HeroUiProvider";
import ReactQueryProvider from "./ReactQueryProvider";
import { NotificationProvider } from "./NotificationProvider";
import GoogleProvider from "./GoogleOAuthProvider";
import FaceBookProvider from "./FaceBookProvider";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <GoogleProvider>
      <FaceBookProvider>
        <ReactQueryProvider>
          <NotificationProvider />
          <HeroUiProvider
            themeProps={{ attribute: "class", defaultTheme: "dark" }}
          >
            {children}
          </HeroUiProvider>
        </ReactQueryProvider>
      </FaceBookProvider>
    </GoogleProvider>
  );
};

export default Providers;
