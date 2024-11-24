/* dompurifyはサーバーサイドでの利用を想定していないため
 isomorphic-dompurifyを利用することでサーバーサイドでの利用を可能にする */
import * as DOMPurify from "isomorphic-dompurify";

export function sanitizeHtml(dirtyHtml: string) {
  const clean = DOMPurify.sanitize(dirtyHtml, {
    ADD_TAGS: ["iframe", "baseline-status"],
    ADD_ATTR: [
      "allow",
      "allowfullscreen",
      "frameborder",
      "scrolling",
      "featureId",
    ],
  });
  return clean;
}
