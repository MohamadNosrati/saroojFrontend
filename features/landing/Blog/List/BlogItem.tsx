import Image from "next/image";
import StaticImage from "@/public/images/serviceImage.png";
import { CalandarIcon } from "@/components/icons";
import Link from "next/link";
import { persianRoutes } from "@/lib/routes/navigationRoutes";

export default function BlogItem() {
    return (
        <Link href={persianRoutes.singleBlogPage("fdsfsdg")}>
            <div className="aspect-video relative">
                <Image src={StaticImage} fill className="absolute" alt="test" />
            </div>
            <div className="sm:p-6 p-4 text-dark bg-primary flex flex-col gap-1.5">
                <div>
                    <span className="font-bold block sm:text-xl max-w-full truncate">fdfsdgd  drfwerwetwefdsfds fdfdsfdsfsتاریخچه بازسازی مدرن در ایران</span>
                </div>
                <div className="flex items-center gap-2">
                    <span>
                        <CalandarIcon width={20} height={20} />
                    </span>
                    <span className="font-bold">
                        دو روز پیش
                    </span>
                </div>
            </div>
        </Link>
    )
}