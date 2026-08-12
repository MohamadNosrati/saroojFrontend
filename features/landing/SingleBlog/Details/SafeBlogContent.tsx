"use client";

import DOMPurify from "isomorphic-dompurify";

interface SafeBlogContentProps {
  html: string;
}

export function SafeBlogContent({ html }: SafeBlogContentProps) {
  const sanitizedHtml = DOMPurify.sanitize(html, {
    FORBID_ATTR: ["style"],
  });

  return (
    <div
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
      className="blog-content font-sans text-base leading-8 text-gray-800 dark:text-gray-200 [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-gray-900 dark:[&_h1]:text-white [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 dark:[&_h2]:text-white [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-gray-900 dark:[&_h3]:text-white [&_p]:leading-8 [&_a]:text-primary [&_a]:underline [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-600 dark:[&_blockquote]:text-gray-300 [&_img]:my-6 [&_img]:max-w-full [&_img]:rounded-2xl [&_code]:rounded [&_code]:bg-gray-100 [&_code]:px-1.5 [&_code]:py-0.5 dark:[&_code]:bg-white/10"
    />
  );
}
