export const adminFilterableFields = [
  "name",
  "email",
  "search",
  "contactNumber",
];
export const adminSearchFields = ["name", "email", "contactNumber"];
// * ADMIN SEARCHABLE FIELD OR OPERATIONS
//   [
//     {
//       name: {
//         contains: params.search,
//         mode: "insensitive",
//       },
//     },
//     {
//       email: {
//         contains: params.search,
//         mode: "insensitive",
//       },
//     },
//   ],
