export default function Map() {
  return (
    <div className="dark:bg-dark bg-white lg:py-12 py-8 px-4 sm:px-6">
      <div className="container max-w-5xl mx-auto">
        {/* Decorative Map Frame Wrapper */}
        <div className="relative overflow-hidden rounded-3xl border border-gray-200/80 dark:border-white/[0.06] bg-slate-50 dark:bg-gray-darker p-2 shadow-[0_12px_40px_rgba(0,0,0,0.04)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.25)] group transition-all duration-500">
          {/* Top Frame Status Bar / Header Look */}
          <div
            className="flex items-center justify-between px-4 pt-2 pb-3 select-none"
            dir="rtl"
          >
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
            </div>

            {/* Soft Location Badge Label */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-200/60 dark:bg-white/[0.04] border border-gray-300/30 dark:border-white/[0.02]">
              <span className="text-xs font-bold text-gray-500 dark:text-gray-400 tracking-wide">
                موقعیت دفتر ساروج
              </span>
            </div>
          </div>

          {/* Map Image/Iframe Mask */}
          <div className="relative rounded-2xl overflow-hidden aspect-video border border-gray-100 dark:border-white/[0.02]">
            {/* Glass Vignette Edge Overlay (fades out into the frame) */}
            <div className="absolute inset-0 pointer-events-none border border-black/5 dark:border-white/5 rounded-2xl z-10 shadow-[inset_0_0_12px_rgba(0,0,0,0.06)]" />

            <iframe
              allowFullScreen
              className="w-full h-full object-cover filter grayscale-[15%] contrast-[105%] dark:brightness-[92%] dark:contrast-[108%] transition-all duration-500"
              loading="lazy"
              src="https://neshan.org/maps/iframe/places/sbvk9NexMWns#c35.722-51.343-15z-0p/35.7220225/51.3379538"
              title="map-iframe"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
