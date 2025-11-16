import HomeCarousel from "@/features/landing/Home/Carousel";
import Categories from "@/features/landing/Home/Categories";
import Faqs from "@/features/landing/Home/Faq";
import Services from "@/features/landing/Home/Services";
import Team from "@/features/landing/Home/Team.tsx";

export default function Home() {
  return (
    <section>
      <HomeCarousel/>
      <Categories/>
      <Services/>
      <Faqs/>
      <Team/>
    </section>
  );
}
