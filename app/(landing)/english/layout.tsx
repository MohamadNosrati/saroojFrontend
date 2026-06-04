import { Viewport } from "next";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

const EnglishLayout = ()=>{
    return (
        <main className="">

        </main>
    )
}

export default EnglishLayout;