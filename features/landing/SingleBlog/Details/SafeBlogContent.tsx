"use client";

import DOMPurify from "dompurify";

interface SafeBlogContentProps {
  html: string;
}

export function SafeBlogContent({ html }: SafeBlogContentProps) {
  const sanitizedHtml = DOMPurify.sanitize(html);
  // Sanitize the HTML to remove malicious scripts
  //   const sanitizedHtml = DOMPurify.sanitize(html, {
  //     ALLOWED_TAGS: [
  //       'p', 'br', 'strong', 'b', 'em', 'i', 'u', 'strike', 's',
  //       'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  //       'ul', 'ol', 'li', 'blockquote', 'pre', 'code',
  //       'a', 'img', 'span', 'div', 'table', 'thead', 'tbody',
  //       'tr', 'th', 'td', 'hr', 'section', 'article'
  //     ],
  //     ALLOWED_ATTR: [
  //       'href', 'src', 'alt', 'title', 'class', 'id', 'style',
  //       'target', 'rel', 'width', 'height', 'align'
  //     ],
  //     ALLOW_DATA_ATTR: false, // Disable data attributes for security
  //     ALLOWED_URI_REGEXP: /^(https?:\/\/|mailto:|tel:|#)/i,
  //   });

  return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
}
