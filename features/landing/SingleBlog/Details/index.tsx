import Image from "next/image";
import StaticImage from "@/public/images/blogsStaticImage.png";
import { CalandarIcon } from "@/components/icons";


export default function BlogDetails() {
    return (
        <section className="bg-gradient-to-b dark:bg-dark bg-white from-primary via-primary/25 to-transparent lg:pt-12 sm:pt-8 pt-6 lg:pb-16 pb-8">
            <div className="container">
                <h1 className="lg:text-4xl text-dark dark:text-white font-bold sm:text-2xl text-xl">
                    تاریخچه بناهای تایخی در ایران
                </h1>
                <div className="flex items-center mt-2.5 justify-between">
                    <div className="flex gap-2 items-center ">
                        <Image src={StaticImage} alt="" className="rounded-full size-12" />
                        <span className="text-black sm:text-2xl text-lg font-bold">
                            محمد نصرتی
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span>
                            <CalandarIcon width={20} height={20} />
                        </span>
                        <span className="font-bold sm:text-lg text-sm">
                            دو روز پیش
                        </span>
                    </div>
                </div>
                <div className="lg:mt-8 sm:mt-6 mt-4 flex justify-center">
                    <Image src={StaticImage} className="aspect-video w-full" alt="" />
                </div>
                <div className="lg:mt-10 sm:mt-8 mt-6 dark:text-white">
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus accusamus nostrum optio laborum? Laborum repellat ex sequi ut, minus nobis voluptas dolorum officiis consequuntur numquam nulla at alias beatae quae!
                        Laudantium dolor harum asperiores illum? Dignissimos nihil sint officiis quasi incidunt ullam consequatur deleniti. Fugit magni iste labore unde quaerat porro dolor, nesciunt ut ea veniam veritatis consectetur, explicabo error?
                        Sed iusto vero quidem magnam nam dolores commodi corporis id debitis totam perferendis, eius ducimus consequatur tempora ipsa ad optio quaerat molestias perspiciatis. Dolorum laborum facilis quidem asperiores. Molestias, at.
                        Magnam asperiores eius ipsum delectus provident impedit vel quibusdam maiores rem incidunt sunt voluptatem perferendis iure quos error accusantium veniam temporibus obcaecati, fugiat voluptate mollitia! Dolores repellendus perspiciatis optio distinctio?
                        Magni, nihil dolore. Optio nobis officia architecto omnis sapiente impedit facere quae fugiat cumque, quibusdam corrupti aspernatur odio deleniti molestiae repellendus obcaecati suscipit esse asperiores officiis? Fuga excepturi incidunt sequi.
                        Voluptatibus porro quisquam nemo debitis dolores voluptas ipsa est nihil et quod molestias optio ipsam itaque rem reiciendis cum cupiditate enim animi molestiae mollitia illo vel a, quasi alias. Quae.
                    </p>
                </div>
                <div className="bg-primary lg:mt-16 sm:mt-12 mt-8 sm:p-6 p-4 flex sm:gap-4 gap-2.5">
                    <div className="min-w-fit">
                        <Image src={StaticImage}  className="lg:size-16 rounded-full sm:size-12 size-10" alt="" />
                    </div>
                    <div className="flex flex-col"  >
                        <span className="sm:text-2xl text-medium">
                            محمد نصرتی
                        </span>
                        <span className="sm:text-xl text-sm">
                        معمار
                        </span>
                        <p className="text-justify">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, odio porro vero veritatis facere eligendi, excepturi placeat velit culpa dolor asperiores est necessitatibus impedit iure similique aliquid magnam in doloremque.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}