import { defineQuery } from "next-sanity";

export const ALL_NOTICES_QUERY = defineQuery(`
  *[_type == "notice"] | order(createdAt desc){
    _id,
    title,
    body,
    createdAt
  }
`);
