import Image from "next/image";
import StaticImage from "@/public/images/serviceImage.png";

const AboutUs = () => {
    return (
        <section className="bg-gray-darker sm:pt-16 sm:pb-20 pt-12 pb-12    ">
            <div className="flex md:gap-14 gap-8 container max-md:flex-col max-md:items-center">
                <div className="lg:flex-1/3 relative md:flex-2/5">
                    <Image src={StaticImage} className="aspect-square" alt="" />
                </div>
                <div className="flex flex-col md:gap-6 gap-4 max-md:items-center lg:flex-2/3 w-full md:flex-3/5">
                    <h1 className="text-white md:text-4xl text-2xl font-bold">About
                        <span className="text-primary mx-1">
                            US
                        </span>
                    </h1>
                    <p className="md:text-xl font-medium text-justify text-gray-lighter">
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean
                    </p>
                </div>
            </div>
        </section>
    )
}

export default AboutUs;