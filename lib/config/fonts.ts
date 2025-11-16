import localFont from "next/font/local";

export const yekanBakh = localFont({
  variable:"--font-yekan",
  display:"swap",
  src : [
    {
      path : "../../public/fonts/persian/yekanBakh/yekan-bakh-regular.woff",
      style:"normal",
      weight:"400"
    },
    {
      path : "../../public/fonts/persian/yekanBakh/yekan-bakh-medium.woff",
      style:"normal",
      weight:"500"
    },
    {
      path : "../../public/fonts/persian/yekanBakh/yekan-bakh-bold.woff",
      style:"normal",
      weight:"700"
    },
    {
      path : "../../public/fonts/persian/yekanBakh/yekan-bakh-heavy.woff",
      style:"normal",
      weight:"900"
    },
  ]
})