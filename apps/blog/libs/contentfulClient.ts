import { strict as assert } from "assert";
import { createClient } from "contentful";

assert(process.env.CONTENTFUL_SPACE_ID);
assert(process.env.CONTENTFUL_ACCESS_TOKEN);

export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});
