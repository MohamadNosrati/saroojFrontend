"use client";

import * as React from "react";
import HeroUiProvider from "./HeroUiProvider";
import ReactQueryProvider from "./ReactQueryProvider";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <ReactQueryProvider>
      <HeroUiProvider themeProps={{ attribute: "class", defaultTheme: "dark" }}>
        {children}
      </HeroUiProvider>
    </ReactQueryProvider>
  );
};

export default Providers;
