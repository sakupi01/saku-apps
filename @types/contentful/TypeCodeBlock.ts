import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeCodeBlockFields {
    internalName: EntryFieldTypes.Symbol;
    description?: EntryFieldTypes.Symbol;
    language?: EntryFieldTypes.Symbol<"css" | "html" | "js" | "json" | "py" | "ts">;
    code: EntryFieldTypes.Text;
}

export type TypeCodeBlockSkeleton = EntrySkeletonType<TypeCodeBlockFields, "codeBlock">;
export type TypeCodeBlock<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeCodeBlockSkeleton, Modifiers, Locales>;
