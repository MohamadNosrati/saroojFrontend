import BlogDetails from "@/features/landing/SingleBlog/Details";
import RelatedBlogs from "@/features/landing/SingleBlog/RelatedBlogs";
import { blogsRoutes } from "@/lib/routes/apiRoutes";
import { getData } from "@/lib/services/data";
import { IBaseResponse } from "@/lib/types/base";
import { IBlog } from "@/lib/types/blog";

export default async function SingleBlogPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const slug = (await params)?.slug;
  const decodedSlug = decodeURIComponent(slug).replaceAll("-", " ");

  const data = await getData<IBaseResponse<IBlog>>(
    blogsRoutes.findBySlug(decodedSlug),
  );
  return (
    <main>
      <BlogDetails blog={data?.data as IBlog} />
      <RelatedBlogs />
    </main>
  );
}
