import { persianRoutes } from "@/lib/routes/navigationRoutes";
import Image from "next/image";
import Link from "next/link";
import StaticImage from "@/public/images/serviceImage.png";
import { WriterIcon } from "@/components/icons";


export default function LatestBlogItem() {
    return (
        <Link href={persianRoutes.singleBlogPage("fdsfsdg")} className="aspect-video relative">
            <div className="size-full absolute left-0 top-0 z-10 bg-gradient-to-t from-dark via-dark/10 to-transparent flex lg:py-10 lg:px-6 p-4 flex-col items-center justify-end text-primary ">
                <div className="flex flex-col w-full sm:gap-3 gap-2">
                    <span className="text-white-gray sm:text-2xl text-lg max-w-full truncate">
                        تاریخچه بازسازی مدرن در ایران
                    </span>
                    <div className="flex items-center gap-2.5">
                        <span>
                            <WriterIcon className="text-primary" width={20} height={20}/>
                        </span>
                        <span className="text-sm text-white-gray">
                            Mohammad Nosrati
                        </span>
                    </div>
                </div>
            </div>
            <div className="relative size-full">
                <Image src={StaticImage} fill className="absolute" alt="test" />
            </div>
        </Link>
    )
}