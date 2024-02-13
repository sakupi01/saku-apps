import {
  Options,
  documentToReactComponents,
} from "@contentful/rich-text-react-renderer";
import {
  BLOCKS,
  Block,
  Document,
  INLINES,
  Inline,
  MARKS,
} from "@contentful/rich-text-types";

import { ReactNode } from "react";
import { TypeComponentRichImageFields } from "../../../../../@types/contentful/TypeComponentRichImage";
import { ArticleImage } from "../article-image";

export type EmbeddedEntryType = TypeComponentRichImageFields | null;

export interface ContentfulRichTextInterface {
  content: Document;
}

function renderEntry(node: Block | Inline, _children: ReactNode) {
  switch (node.data.target.sys.contentType.sys.id) {
    case "componentRichImage":
      return <ArticleImage image={node.data.target.fields} />;
    case "videoEmbed":
      return (
        <iframe
          src={node.data.target.fields.embedUrl}
          height="100%"
          width="100%"
          frameBorder="0"
          scrolling="no"
          title={node.data.target.fields.title}
          allowFullScreen={true}
        />
      );
    case "codeBlock":
      return (
        <pre>
          <code>{node.data.target.fields.code}</code>
        </pre>
      );
  }
}

function renderParagraph(_node: Block | Inline, children: ReactNode) {
  return <p className="text-red-300">{children}</p>;
}

function renderCode(text: ReactNode): ReactNode {
  return (
    <div className="px-6 py-3 my-4 bg-gray-500 text-blue-300 font-mono rounded-lg">
      <pre>
        <code>{text}</code>
      </pre>
    </div>
  );
}

function renderHeading2(_node: Block | Inline, children: ReactNode) {
  return <p className="text-3xl text-blue-300">{children}</p>;
}

function getEntryWithId(_entryId: string) {
  const mockEntry = {
    fields: {
      slug: "entry-slug",
    },
  };

  return mockEntry;
}

function renderHyperlink(node: Block | Inline, children: ReactNode) {
  // If you are using contentful.js client library, the referenced entry is resolved
  // automatically and is available at `node.data.target`.
  const referencedEntry = getEntryWithId(node.data.target.sys.id);

  return <a href={`/pages/${referencedEntry.fields.slug}`}>{children}</a>;
}

export const contentfulBaseRichTextOptions: Options = {
  // If you are using contentful.js client library, the referenced entry is resolved
  // automatically and is available at `node.data.target`.
  renderMark: {
    [MARKS.CODE]: renderCode,
  },
  renderNode: {
    /* EMBEDDED_ENTRY is used for linked entries, such as references to other blog posts */
    [BLOCKS.EMBEDDED_ENTRY]: renderEntry,
    [BLOCKS.EMBEDDED_RESOURCE]: renderEntry,
    [BLOCKS.EMBEDDED_ASSET]: renderEntry,

    /* BLOCKS */
    [BLOCKS.HEADING_2]: renderHeading2,
    [BLOCKS.PARAGRAPH]: renderParagraph,

    /* INLINES */
    [INLINES.HYPERLINK]: renderHyperlink,
  },
};

export const CtfRt = ({ content }: ContentfulRichTextInterface) => {
  return (
    <article className="prose prose-sm max-w-none">
      {documentToReactComponents(content, contentfulBaseRichTextOptions)}
    </article>
  );
};
