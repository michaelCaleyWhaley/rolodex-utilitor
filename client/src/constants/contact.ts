export const nestedKeys = ["Line1", "Line2", "Line3", "PostCode"];
export const contactFields = [
  {
    label: "first name",
    name: "FirstName",
    type: "text",
    required: true,
  },
  {
    label: "last name",
    name: "LastName",
    type: "text",
    required: true,
  },
  {
    label: "company name",
    name: "Company",
    type: "text",
    required: false,
  },
  {
    label: "address line 1",
    name: "Line1",
    type: "text",
    required: false,
  },
  {
    label: "address line 2",
    name: "Line2",
    type: "text",
    required: false,
  },
  {
    label: "address line 3",
    name: "Line3",
    type: "text",
    required: false,
  },
  { label: "postcode", name: "PostCode", type: "text", required: false },
  { label: "email", name: "Email", type: "email", required: false },
  {
    label: "phone number",
    name: "PhoneNo",
    type: "tel",
    required: false,
  },
  {
    label: "service start date",
    name: "ServiceStart",
    type: "date",
    required: false,
  },
  {
    label: "service frequency",
    name: "ServiceFreq",
    type: "number",
    required: false,
  },
];
