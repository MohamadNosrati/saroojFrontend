import { getLocale, getTranslations } from "next-intl/server";

import { IBlog } from "@/lib/types/blog";

import RelatedBlogsContainer from "./Container";

interface IProps {
  suggestions: IBlog[];
}

export default async function RelatedBlogs({ suggestions }: IProps) {
  const t = await getTranslations("SingleBlog");
  const locale = await getLocale();
  const condition = locale === "fa" ? "title" : "titleEn";

  return (
    <section className="bg-gradient-to-b dark:bg-dark bg-white from-primary via-primary/25 to-transparent lg:pt-12 sm:pt-8 pt-6 lg:pb-16 pb-8">
      <div className="container">
        <div className="mb-2.5">
          <span className="sm:text-2xl font-bold text-lg">{t("offering")}</span>
        </div>
        <RelatedBlogsContainer
          suggestions={suggestions?.filter((item) => item[condition])}
        />
      </div>
    </section>
  );
}
