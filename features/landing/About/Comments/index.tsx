import { CommentsRoute } from "@/lib/routes/apiRoutes";
import CommentsBg from "@/public/images/commentsBg.png";
import { getData } from "@/lib/services/data";
import { IBaseResponse } from "@/lib/types/base";

import Container from "./Container";

const Comments = async () => {
  const data = await getData<IBaseResponse<IComment[]>>(CommentsRoute.getAll());

  return (
    <section
      className="relative lg:py-16 md:py-12 py-10 dark:bg-dark bg-gray-50/50 bg-cover bg-center overflow-hidden border-t border-b border-black/[0.03] dark:border-white/[0.03]"
      style={{
        backgroundImage: `url(${CommentsBg.src})`,
      }}
    >
      <div className="absolute inset-0 bg-white/40 dark:bg-dark/80 backdrop-blur-[2px] z-0 pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 flex flex-col items-center">
        {/* COMPACT HEADER */}
        <div className="flex flex-col items-center text-center gap-1.5 max-w-xl">
          <span className="text-[10px] font-black tracking-widest text-primary uppercase">
            صدای مشتریان ساروج
          </span>
          <h4 className="text-gray-900 dark:text-white sm:text-2xl text-xl font-black tracking-tight">
            نظر مشتری‌ها چیست؟
          </h4>
          <p className="text-center sm:text-sm text-xs text-gray-600 dark:text-gray-300 font-medium tracking-wide">
            اگر نظری دارید؛ لطفاً در ارسال پیام به ما تردید نکنید!
          </p>
        </div>

        {/* CONTAINER SPACING TIGHTENED */}
        <div className="lg:mt-14 md:mt-10 mt-8 w-full">
          <Container
            data={data?.data?.filter((item) => item?.isActive) || []}
          />
        </div>
      </div>
    </section>
  );
};

export default Comments;
