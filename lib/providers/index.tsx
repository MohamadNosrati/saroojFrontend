"use client";

import * as React from "react";
import HeroUiProvider from "./HeroUiProvider";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <HeroUiProvider themeProps={{ attribute: "class", defaultTheme: "dark" }}>
      {children}
    </HeroUiProvider>
  );
};

export default Providers;
