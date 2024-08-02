import { render, screen } from "@testing-library/react";
import { ContactInfo } from "./ContactInfo";
import { ContactFields } from "../../../../../types/types";

const mockedFields: ContactFields = {
  email: [
    {
      label: "email",
      modifier: "",
      is_primary: false,
      value: "test@test.com",
    },
  ],
  "first name": [
    { label: "first name", modifier: "", is_primary: false, value: "artem" },
  ],
  "last name": [
    { label: "last name", modifier: "", is_primary: false, value: "artem2" },
  ],
};

describe("should contact info", () => {
  it.each([
    {
      value: /artem/i,
      label: "first name",
    },
    {
      value: /artem2/i,
      label: "last name",
    },
    {
      value: /test@test.com/i,
      label: "email",
    },
  ])("should render $label", ({ value }) => {
    render(<ContactInfo data={mockedFields} ignoreLink />);
    expect(screen.queryAllByText(value)).toBeDefined();
  });

  it.each([
    {
      value: /test@test.com/i,
      label: "email",
    },
  ])("should render $label", ({ value }) => {
    render(<ContactInfo data={mockedFields} />);
    expect(screen.queryAllByText(value)).toBeDefined();
  });
});
