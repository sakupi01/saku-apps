import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeComponentSeoSkeleton } from "./TypeComponentSeo";
import type { TypePageBlogPostSkeleton } from "./TypePageBlogPost";

export interface TypePageLandingFields {
    internalName: EntryFieldTypes.Symbol;
    seoFields?: EntryFieldTypes.EntryLink<TypeComponentSeoSkeleton>;
    featuredBlogPost?: EntryFieldTypes.EntryLink<TypePageBlogPostSkeleton>;
}

export type TypePageLandingSkeleton = EntrySkeletonType<TypePageLandingFields, "pageLanding">;
export type TypePageLanding<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypePageLandingSkeleton, Modifiers, Locales>;
