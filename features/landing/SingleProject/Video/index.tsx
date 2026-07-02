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

    if (!container) return;

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

    script.src = `https://www.aparat.com/embed/paa40l8?data[rnddiv]=${video}&data[responsive]=yes&muted=true&recom=self`;
    script.async = true;

    container.appendChild(script);

    return () => {
      observer.disconnect();
      container.innerHTML = "";
    };
  }, [video]);

  return (
    <div className="relative w-full aspect-video">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-900">
          <Skeleton className="w-full h-full" />
        </div>
      )}

      <div
        ref={containerRef}
        className={loading ? "opacity-0" : "opacity-100"}
        id={video}
      />
    </div>
  );
}
