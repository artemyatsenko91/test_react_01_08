import { FormFields } from "../features/ContactForm/components/types";

export const returnContactData = (value: FormFields) => ({
  avatar_url:
    "https://img.freepik.com/free-photo/close-up-on-kitten-surrounded-by-flowers_23-2150782325.jpg?w=360&t=st=1722548958~exp=1722549558~hmac=fdd6cb71f68a977ada2a2ebc78742a062266192378cc246c54806ca62f49bb3a",
  fields: {
    "first name": [
      {
        value: value.firstName,
        modifier: "",
        label: "first name",
      },
    ],
    "last name": [
      {
        value: value.lastName,
        modifier: "",
        label: "last name",
      },
    ],
    email: [
      {
        value: value.email,
        modifier: "",
        label: "email",
      },
    ],
  },
  record_type: "person",
  privacy: {
    edit: null,
    read: null,
  },
  owner_id: null,
});
