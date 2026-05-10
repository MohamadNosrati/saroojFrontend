import ReactCompareImage from 'react-compare-image';
import StaticImage from "@/public/images/banner.png";
import sStaticImage from "@/public/images/GHAB MEDIA DESKTOP 348.jpg";


export default function BeforeAfterItem() {
    return (
        <div className=' bg-red-400'>
            <ReactCompareImage leftImageCss={{
                height: "100%",
                objectFit:"cover"

            }} rightImageCss={{
                height: "100%",
                objectFit:"cover",
                filter: "grayscale(100%)"
            }} aspectRatio='wider' leftImage={StaticImage?.src} rightImage={sStaticImage?.src} />
        </div>
    )
}