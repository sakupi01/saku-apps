import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeComponentRichImageFields {
    internalName: EntryFieldTypes.Symbol;
    image: EntryFieldTypes.AssetLink;
    caption?: EntryFieldTypes.Symbol;
    fullWidth?: EntryFieldTypes.Boolean;
}

export type TypeComponentRichImageSkeleton = EntrySkeletonType<TypeComponentRichImageFields, "componentRichImage">;
export type TypeComponentRichImage<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeComponentRichImageSkeleton, Modifiers, Locales>;
