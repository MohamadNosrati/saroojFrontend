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

    // Parse the embed code stored in the database.
    const parser = new DOMParser();
    const document = parser.parseFromString(video, "text/html");

    const sourceContainer = document.body.firstElementChild;

    if (!sourceContainer) {
      setLoading(false);

      return;
    }

    const div = document.createElement("div");

    // Preserve the dynamic rnddiv ID from the database.
    if (sourceContainer.id) {
      div.id = sourceContainer.id;
    }

    const sourceScript = sourceContainer.querySelector("script");

    if (!sourceScript?.src) {
      setLoading(false);

      return;
    }

    const script = document.createElement("script");

    // Preserve the complete Aparat URL exactly as stored in the DB.
    script.src = sourceScript.src;
    script.type = sourceScript.type || "text/javascript";
    script.async = true;

    div.appendChild(script);
    container.appendChild(div);

    // Aparat dynamically creates the iframe after loading the script.
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

    // Fallback: don't leave the skeleton forever if Aparat
    // doesn't create the iframe for some reason.
    const timeout = window.setTimeout(() => {
      setLoading(false);
      observer.disconnect();
    }, 10000);

    return () => {
      observer.disconnect();
      window.clearTimeout(timeout);
      container.innerHTML = "";
    };
  }, [video]);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg">
      {loading && (
        <div className="absolute inset-0 z-10">
          <Skeleton className="h-full w-full" />
        </div>
      )}

      <div
        ref={containerRef}
        className={`h-full w-full transition-opacity duration-300 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
      />
    </div>
  );
}
