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
    ar: {
      title: blog?.titleAr,
      alt: blog?.altAr,
      description: blog?.descriptionAr,
    },
  };

  return (
    <section className="relative overflow-hidden bg-white dark:bg-dark">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] overflow-hidden">
        <div className="absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -right-32 top-20 h-[360px] w-[360px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-white dark:to-dark" />
      </div>

      <div className="relative">
        {/* Hero */}
        <div className="pt-8 sm:pt-12 lg:pt-16">
          {/* Top metadata */}
          <div className="mb-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Image
                alt={blogLang[locale as LocaleEnum]?.alt}
                className="size-11 rounded-full border-2 border-white object-cover shadow-md dark:border-white/10 sm:size-14"
                height={100}
                src={uploadUrl(blog?.pictureId?.image)}
                width={100}
              />

              <div className="flex flex-col">
                <span className="text-sm font-semibold text-dark dark:text-white sm:text-base">
                  {blog?.userId?.userName}
                </span>

                <div className="mt-0.5 flex items-center gap-1.5 text-xs text-dark/55 dark:text-white/50 sm:text-sm">
                  <CalandarIcon height={15} width={15} />

                  <span>
                    {dateConvertor(blog?.createdAt, locale as LocaleEnum)}
                  </span>
                </div>
              </div>
            </div>

            <div className="shrink-0 rounded-full border border-black/5 bg-white/80 p-1 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5">
              <ShareButton
                paylod={{
                  text: blog?.userId?.userName,
                  title: blogLang[locale as LocaleEnum]?.title,
                  image: uploadUrl(blog?.pictureId?.image),
                }}
              />
            </div>
          </div>

          {/* Title */}
          <div className="max-w-5xl">
            <h1 className="text-3xl font-black leading-[1.12] tracking-tight text-dark dark:text-white sm:text-4xl lg:text-6xl lg:leading-[1.08]">
              {blogLang[locale as LocaleEnum]?.title}
            </h1>
          </div>

          {/* Hero image */}
          <div className="relative mt-8 sm:mt-10 lg:mt-12">
            <div className="absolute -inset-2 -z-10 rounded-[2rem] bg-primary/10 blur-2xl" />

            <div className="group relative overflow-hidden rounded-2xl bg-black/5 shadow-2xl shadow-black/10 sm:rounded-3xl">
              <Image
                alt={blogLang[locale as LocaleEnum]?.alt}
                className="aspect-video w-full object-cover transition-transform duration-700 group-hover:scale-[1.015]"
                height={700}
                src={uploadUrl(blog?.pictureId?.image)}
                width={1194}
                priority
              />

              {/* Image overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60" />
            </div>
          </div>
        </div>

        {/* Article */}
        <div className="relative mx-auto mt-10 max-w-3xl pb-12 sm:mt-14 lg:mt-16 lg:pb-20">
          {/* Reading indicator */}
          <div className="mb-8 flex items-center gap-3">
            <div className="h-px flex-1 bg-black/10 dark:bg-white/10" />

            <span className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
              Article
            </span>

            <div className="h-px flex-1 bg-black/10 dark:bg-white/10" />
          </div>

          {/* Content */}
          <article className="dark:!text-white">
            <SafeBlogContent
              html={blogLang[locale as LocaleEnum]?.description}
            />
          </article>

          {/* Bottom author card */}
          <div className="mt-12 border-t border-black/10 pt-8 dark:border-white/10 sm:mt-16 sm:pt-10">
            <div className="flex items-center justify-between gap-4 rounded-2xl bg-black/[0.025] p-4 dark:bg-white/[0.035] sm:p-5">
              <div className="flex min-w-0 items-center gap-3">
                <Image
                  alt={blogLang[locale as LocaleEnum]?.alt}
                  className="size-11 shrink-0 rounded-full object-cover sm:size-12"
                  height={100}
                  src={uploadUrl(blog?.pictureId?.image)}
                  width={100}
                />

                <div className="min-w-0">
                  <p className="text-xs text-dark/50 dark:text-white/50">
                    Written by
                  </p>

                  <p className="truncate text-sm font-bold text-dark dark:text-white sm:text-base">
                    {blog?.userId?.userName}
                  </p>
                </div>
              </div>

              <ShareButton
                paylod={{
                  text: blog?.userId?.userName,
                  title: blogLang[locale as LocaleEnum]?.title,
                  image: uploadUrl(blog?.pictureId?.image),
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
    // <section className="bg-gradient-to-b dark:bg-dark bg-white from-primary via-primary/25 to-transparent lg:pt-12 sm:pt-8 pt-6 lg:pb-16 pb-8">
    //   <div className="container">
    //     <div className="flex items-center justify-between">
    //       <h1 className="lg:text-4xl text-dark dark:text-white font-bold sm:text-2xl text-xl max-w-4/5 text-wrap">
    //         {blogLang[locale as LocaleEnum]?.title}
    //       </h1>
    //       <div className="min-w-fit">
    //         <ShareButton
    //           paylod={{
    //             text: blog?.userId?.userName,
    //             title: blogLang[locale as LocaleEnum]?.title,
    //             image: uploadUrl(blog?.pictureId?.image),
    //           }}
    //         />
    //       </div>
    //     </div>
    //     <div className="flex items-center mt-2.5 justify-between">
    //       <div className="flex gap-2 items-center ">
    //         <Image
    //           alt={blogLang[locale as LocaleEnum]?.alt}
    //           className="rounded-full sm:size-12 size-8 object-cover"
    //           height={100}
    //           src={uploadUrl(blog?.pictureId?.image)}
    //           width={100}
    //         />
    //         <span className="text-black sm:text-2xl font-bold">
    //           {blog?.userId?.userName}
    //         </span>
    //       </div>
    //       <div className="flex items-center gap-2">
    //         <span>
    //           <CalandarIcon height={20} width={20} />
    //         </span>
    //         <span className="font-bold sm:text-lg text-sm">
    //           {dateConvertor(blog?.createdAt, locale as LocaleEnum)}
    //         </span>
    //       </div>
    //     </div>
    //     <div className="lg:mt-8 sm:mt-6 mt-4 flex justify-center">
    //       <Image
    //         alt=""
    //         className="aspect-video w-full"
    //         height={700}
    //         src={uploadUrl(blog?.pictureId?.image)}
    //         width={1194}
    //       />
    //     </div>
    //     <div className="lg:mt-10 sm:mt-8 mt-6 dark:!text-white">
    //       <SafeBlogContent html={blogLang[locale as LocaleEnum]?.description} />
    //     </div>
    //   </div>
    // </section>
  );
}
