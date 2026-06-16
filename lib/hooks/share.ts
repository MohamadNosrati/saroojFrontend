import { usePathname } from "next/navigation";

import { responseHandler } from "../tools/responseHandler";

interface SharePayload {
  title: string;
  text: string;
  image?: string;
  files?: File[];
  url?: string;
}

const useShare = (payload: SharePayload) => {
  const pathName = usePathname();
  const { text, title, image } = payload;
  const shareHandler = async () => {
    const shareData: SharePayload = {
      title: title,
      text: text,
      url: process.env.NEXT_PUBLIC_BASE_URL + pathName,
      files: [],
    };

    if (image && navigator.canShare && navigator.canShare({ files: [] })) {
      try {
        const fullImageUrl = process.env.NEXT_PUBLIC_STORAGE_URL_MAIN + image;
        const response = await fetch(fullImageUrl);
        const blob = await response.blob();
        const file = new File([blob], title, { type: blob.type });

        shareData.files = [file];
      } catch (e) {
        console.warn("Image fetch failed, sharing without file", e);
      }
    }
    try {
      await navigator.share(shareData);
    } catch (err) {
      if (typeof navigator.share !== "function") {
        await navigator.clipboard.writeText(shareData?.url as string);
        responseHandler?.warning(
          "مرور گر شما از اشتراک خودکار پشتیبابی نمیکند.لینک در کیبورد شما کپی شد.",
        );
      } else {
        responseHandler?.fail("مشکلی پیش آمده است.");
      }
      console.log(err);
    }
  };

  return { shareHandler };
};

export default useShare;
