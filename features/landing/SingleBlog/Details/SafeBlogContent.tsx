"use client";

import DOMPurify from "dompurify";

interface SafeBlogContentProps {
  html: string;
}

export function SafeBlogContent({ html }: SafeBlogContentProps) {
  console.log("html",html)
  const sanitizedHtml = DOMPurify?.sanitize(html);

  return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
}
