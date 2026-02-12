export default {
  name: "notice",
  type: "document",
  title: "Notice",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "body",
      type: "text",
      title: "Notice Body",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "createdAt",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    },
  ],
};
