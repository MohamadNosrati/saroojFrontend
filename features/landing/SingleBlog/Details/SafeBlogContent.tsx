"use client";

import DOMPurify from "isomorphic-dompurify";

interface SafeBlogContentProps {
  html: string;
}

export function SafeBlogContent({ html }: SafeBlogContentProps) {
  const sanitizedHtml = DOMPurify?.sanitize(html);

  return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
}
