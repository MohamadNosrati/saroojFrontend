import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider, ThemeProviderProps } from "next-themes";

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

export interface HeroUiProviderProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

const HeroUiProvider : React.FC<HeroUiProviderProps> = ({children,themeProps}) => {
  const router = useRouter();
  return (
    <HeroUIProvider  navigate={router.push}>
      <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
    </HeroUIProvider>
  );
};

export default HeroUiProvider;
