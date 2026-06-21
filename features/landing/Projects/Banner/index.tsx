import Image from "next/image";

import BannerImage from "@/public/images/projectsBanner.png";

const Banner = () => {
  return (
    <section className="dark:bg-dark bg-gray-50/50 py-6 sm:py-8 overflow-hidden">
      <div className="container relative group px-4">
        {/* MAIN IMAGE CONTAINER CARD WITH GLASSMOPHISM HALO BORDER */}
        <div className="relative aspect-[21/9] sm:aspect-[21/7] w-full overflow-hidden rounded-3xl shadow-xl dark:shadow-black/50 border border-black/5 dark:border-white/5">
          {/* CINEMATIC LAYERED GRADIENT OVERLAY */}
          {/* Creates a rich vignette that darkens the edges for depth and contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 z-10 transition-opacity duration-500 group-hover:opacity-90" />

          {/* DYNAMIC BACKGROUND IMAGE */}
          <Image
            alt="Sarooj Projects Banner"
            className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            src={BannerImage}
            priority // Ensures banner loads immediately
          />

          {/* FLOATING BANNER TEXT CONTENT */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-6 select-none">
            {/* Dynamic framing line underneath title */}
            <span className="w-16 h-[3px] bg-gradient-to-r from-transparent via-primary to-transparent rounded-full mt-4 shadow-[0_0_10px_var(--tw-shadow-color)] shadow-primary/50 transition-all duration-500 group-hover:w-28" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
