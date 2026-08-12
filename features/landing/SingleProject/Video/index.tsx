"use client";

import { Skeleton } from "@heroui/skeleton";
import { useEffect, useRef, useState } from "react";

interface IProps {
  video: string;
}

export default function Video({ video }: IProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const container = containerRef.current;

    if (!container || !video) return;

    setLoading(true);
    container.innerHTML = "";

    const observer = new MutationObserver(() => {
      const iframe = container.querySelector("iframe");

      if (iframe) {
        setLoading(false);
        observer.disconnect();
      }
    });

    observer.observe(container, {
      childList: true,
      subtree: true,
    });

    const script = document.createElement("script");

    script.src = `https://www.aparat.com/embed/${video}?data[rnddiv]=aparat-video-${video}&data[responsive]=yes&muted=true&recom=self`;
    script.async = true;

    container.appendChild(script);

    return () => {
      observer.disconnect();
      container.innerHTML = "";
    };
  }, [video]);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg">
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
          <Skeleton className="h-full w-full" />
        </div>
      )}

      <div
        ref={containerRef}
        id={`aparat-video-${video}`}
        className={`h-full w-full transition-opacity duration-300 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
      />
    </div>
  );
}