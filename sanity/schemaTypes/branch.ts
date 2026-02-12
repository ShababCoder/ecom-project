export default {
  name: "branch",
  type: "document",
  title: "Branch",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Branch Name",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "location",
      type: "text",
      title: "Location Address",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "phoneNumbers",
      type: "array",
      title: "Mobile Numbers",
      of: [{ type: "string" }],
      validation: (Rule: any) => Rule.required(),
    },
  ],
};
