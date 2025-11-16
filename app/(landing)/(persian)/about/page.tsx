import AboutUs from "@/features/landing/About/AboutUs";
import Comments from "@/features/landing/About/Comments";
import Contact from "@/features/landing/About/Contact";
import Form from "@/features/landing/About/Form";
import Socials from "@/features/landing/About/Socials";

const AboutPage = ()=>{
    return (
        <section>
            <AboutUs/>
            <Comments/>
            <Contact/>
            <Form/>
            <Socials/>
        </section>
    )
}

export default AboutPage;