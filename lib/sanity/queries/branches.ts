import { defineQuery } from "next-sanity";

export const ALL_BRANCHES_QUERY = defineQuery(`
  *[_type == "branch"] | order(_createdAt asc){
    _id,
    title,
    location,
    phoneNumbers
  }
`);
