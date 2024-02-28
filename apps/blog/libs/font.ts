/**
 * Google FontsのCSSファイルから、
 * フォントURL `src: url(ここ) format(truetype OR opentype)` を探し、
 * 見つかればfetchしてArrayBufferにして返す
 * @see https://github.com/kvnang/workers-og/blob/main/packages/workers-og/src/font.ts
 * @see https://zenn.dev/uzimaru0000/articles/satori-workers
 *
 * 調べてみると、next/fontも同じようなことをしている
 * @see https://github.com/vercel/next.js/blob/canary/packages/font/src/google/find-font-files-in-css.ts
 */
export async function loadGoogleFont({
  family,
  weight,
  text,
}: {
  family: string;
  weight?: number;
  text?: string;
}) {
  const params = new URLSearchParams({
    family: `${family}${weight ? `:wght@${weight}` : ""}`,
  });
  if (text) {
    params.append("text", text);
  } else {
    params.append("subset", "latin");
  }

  const url = `https://fonts.googleapis.com/css2?${params.toString()}`;

  const css = await fetch(url).then((res) => res.text());

  const fontUrl = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/,
  )?.[1];

  if (!fontUrl) {
    throw new Error("Font file not found in CSS fetched from Google Fonts");
  }

  return fetch(fontUrl).then((res) => res.arrayBuffer());
}
