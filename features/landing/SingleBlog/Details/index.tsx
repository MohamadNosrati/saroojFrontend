import Image from "next/image";
import { getLocale } from "next-intl/server";

import { CalandarIcon } from "@/components/icons";
import { IBlog } from "@/lib/types/blog";
import { dateConvertor } from "@/lib/tools/dateConvertor";
import { uploadUrl } from "@/lib/tools/upload";
import { LocaleEnum } from "@/lib/types/base";

import ShareButton from "../../layout/ShareButton";

import { SafeBlogContent } from "./SafeBlogContent";

interface IProps {
  blog: IBlog;
}

export default async function BlogDetails({ blog }: IProps) {
  const locale = await getLocale();
  const blogLang: Record<
    LocaleEnum,
    {
      title: string;
      alt: string;
      description: string;
    }
  > = {
    fa: {
      title: blog?.title,
      alt: blog?.alt,
      description: blog?.description,
    },
    en: {
      title: blog?.titleEn,
      alt: blog?.altEn,
      description: blog?.descriptionEn,
    },
  };

  return (
    <section className="bg-gradient-to-b dark:bg-dark bg-white from-primary via-primary/25 to-transparent lg:pt-12 sm:pt-8 pt-6 lg:pb-16 pb-8">
      <div className="container">
        <div className="flex items-center justify-between">
          <h1 className="lg:text-4xl text-dark dark:text-white font-bold sm:text-2xl text-xl max-w-4/5 text-wrap">
            {blogLang[locale as LocaleEnum]?.title}
          </h1>
          <div className="min-w-fit">
            <ShareButton
              paylod={{
                text: blog?.userId?.userName,
                title: blogLang[locale as LocaleEnum]?.title,
                image: uploadUrl(blog?.pictureId?.image),
              }}
            />
          </div>
        </div>
        <div className="flex items-center mt-2.5 justify-between">
          <div className="flex gap-2 items-center ">
            <Image
              alt={blogLang[locale as LocaleEnum]?.alt}
              className="rounded-full sm:size-12 size-8 object-cover"
              height={100}
              src={uploadUrl(blog?.pictureId?.image)}
              width={100}
            />
            <span className="text-black sm:text-2xl font-bold">
              {blog?.userId?.userName}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span>
              <CalandarIcon height={20} width={20} />
            </span>
            <span className="font-bold sm:text-lg text-sm">
              {dateConvertor(blog?.createdAt, locale === "en")}
            </span>
          </div>
        </div>
        <div className="lg:mt-8 sm:mt-6 mt-4 flex justify-center">
          <Image
            alt=""
            className="aspect-video w-full"
            height={700}
            src={uploadUrl(blog?.pictureId?.image)}
            width={1194}
          />
        </div>
        <div className="lg:mt-10 sm:mt-8 mt-6 dark:!text-white">
          <SafeBlogContent html={blogLang[locale as LocaleEnum]?.description} />
        </div>
      </div>
    </section>
  );
}
