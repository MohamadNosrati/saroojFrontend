import Image from "next/image";
import StaticImage from "@/public/images/serviceImage.png";

const AboutUs = ()=>{
    return (
        <section className="bg-gray-darker pt-48 pb-20">
            <div className="flex gap-14 container ">
                <div className="flex-1/3">
                    <Image src={StaticImage} className="aspect-square" alt=""/>
                </div>
                <div className="flex flex-col gap-6 flex-2/3">
                    <h1 className="text-white text-4xl font-bold">About US</h1>
                    <p className="text-xl font-medium text-gray-lighter">
                       Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean  
                    </p>
                </div>
            </div>
        </section>
    )
}

export default AboutUs;