import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeComponentSeoFields {
    internalName: EntryFieldTypes.Symbol;
    pageTitle: EntryFieldTypes.Symbol;
    pageDescription?: EntryFieldTypes.Text;
    canonicalUrl?: EntryFieldTypes.Symbol;
    nofollow: EntryFieldTypes.Boolean;
    noindex: EntryFieldTypes.Boolean;
    shareImages?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
}

export type TypeComponentSeoSkeleton = EntrySkeletonType<TypeComponentSeoFields, "componentSeo">;
export type TypeComponentSeo<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeComponentSeoSkeleton, Modifiers, Locales>;
