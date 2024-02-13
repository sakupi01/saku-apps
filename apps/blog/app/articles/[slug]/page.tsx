import { CtfImage, CtfRt } from "@repo/ui";
import { ICtfImage } from "../../../../../@types";
import { TypePageBlogPostSkeleton } from "../../../../../@types/contentful";
import { assertNonNullable } from "../../../libs/assertNonNullable";
import { client } from "../../../libs/contentfulClient";
type PostPageProps = {
  params: {
    slug: string;
  };
};

export default async function PostPage(props: PostPageProps) {
  const { params } = props;
  const { slug } = params;
  const fetchBlogPost = async (slug: string) => {
    const queryOptions = {
      content_type: "pageBlogPost" as const,
      "fields.slug[match]": slug,
    };
    const queryResult =
      await client.getEntries<TypePageBlogPostSkeleton>(queryOptions);
    assertNonNullable(queryResult.items[0]);
    return queryResult.items[0];
  };
  const blogPost = await fetchBlogPost(slug);
  const { featuredImage, title, content, publishedDate } = blogPost.fields;
  console.log("*****");
  console.log(content.content[7]);
  console.log("*****");

  // NOTE: ICtfImageの型であるが、生成された方では推論できないので、as unknown as ICtfImageとする
  const ctfImageResource: ICtfImage = featuredImage as unknown as ICtfImage;

  return (
    <main className="min-h-screen p-24 flex justify-center">
      <div className="max-w-2xl">
        <CtfImage
          {...ctfImageResource}
          nextImageProps={{
            className: "w-full border-2 border-slate-400 rounded-md",
            priority: true,
            sizes: undefined,
          }}
        />
        <h1 className="font-extrabold text-3xl mb-2">{title}</h1>
        <p className="mb-6 text-slate-400 ">
          Posted on{" "}
          {new Date(publishedDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        <CtfRt content={content} />
      </div>
    </main>
  );
}
