// export default {
//   name: "feedback",
//   type: "document",
//   title: "Customer Feedback",
//   fields: [
//     { name: "name", type: "string", title: "Name" },
//     { name: "email", type: "string", title: "Email" },
//     { name: "phone", type: "string", title: "Mobile Number" },
//     {
//       name: "nature",
//       type: "string",
//       title: "Nature",
//       options: {
//         list: [
//           { title: "Complaint", value: "complaint" },
//           { title: "Request", value: "request" },
//         ],
//       },
//     },
//     {
//       name: "branch",
//       type: "reference",
//       to: [{ type: "branch" }],
//       title: "Branch",
//     },
//     {
//       name: "message",
//       type: "text",
//       title: "Feedback / Suggestion / Enquiry",
//     },
//     {
//       name: "createdAt",
//       type: "datetime",
//       initialValue: () => new Date().toISOString(),
//     },
//   ],
// };

export default {
  name: "feedback",
  type: "document",
  title: "Customer Feedback",
  fields: [
    { name: "name", type: "string", title: "Name" },
    { name: "email", type: "string", title: "Email" },
    { name: "phone", type: "string", title: "Mobile Number" },
    {
      name: "nature",
      type: "string",
      title: "Nature",
      options: {
        list: [
          { title: "Complaint", value: "complaint" },
          { title: "Request", value: "request" },
        ],
      },
    },
    {
      name: "branch",
      type: "reference",
      to: [{ type: "branch" }],
      title: "Branch",
    },
    {
      name: "message",
      type: "text",
      title: "Feedback / Suggestion / Enquiry",
    },
    {
      name: "status",
      type: "string",
      title: "Status",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Resolved", value: "resolved" },
        ],
      },
      initialValue: "pending",
    },
    {
      name: "createdAt",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    },
  ],
};
