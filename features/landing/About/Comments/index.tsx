import { CommentsRoute } from "@/lib/routes/apiRoutes";
import Container from "./Container";
import CommentsBg from "@/public/images/commentsBg.png";

const Comments = async () => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_URL + CommentsRoute.getAll(),
  );
  const data = await res.json();
  return (
    <section
      style={{
        backgroundImage: `url(${CommentsBg.src})`,
      }}
      className="lg:pt-20 lg:pb-48 bg-cover md:pt-14 md:pb-24 sm:pt-10 sm:pb-14 py-10 dark:bg-dark bg-white"
    >
      <div>
        <div className="container flex flex-col items-center">
          <h4 className="dark:text-white  sm:text-4xl text-xl font-bold">
            نظر مشتری ها چیست ؟
          </h4>
          <p className="mt-5 text-center sm:text-2xl text-lg   dark:text-white font-medium">
            اگر نظری دارید
            <br />
            لطفا در ارسال پیام به ما تردید نکنید !
          </p>
          <div className="lg:mt-20 md:mt-16 mt-10 container">
            <Container data={data?.data} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comments;
