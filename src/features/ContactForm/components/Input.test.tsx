/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "./Input";
import { FieldApi } from "@tanstack/react-form";
import { FormFields } from "./types";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-expect-error
const mockField: FieldApi<FormFields, any, any, any> = {
  name: "email",
  state: {
    value: "",
    meta: {
      errorMap: {},
      isDirty: true,
      isPristine: true,
      isTouched: false,
      errors: [],
      isValidating: false,
    },
  },
  handleBlur: jest.fn(),
  handleChange: jest.fn(),
};

describe("Input component", () => {
  it("should render the input field with initial state", () => {
    render(<Input field={mockField} />);

    const inputElement = screen.getByLabelText(/email/i);
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue("");
  });

  it("should call handleChange on input change", () => {
    render(<Input field={mockField} />);

    const inputElement = screen.getByLabelText(/email/i);
    fireEvent.change(inputElement, { target: { value: "test@test.com" } });

    expect(mockField.handleChange).toHaveBeenCalledWith("test@test.com");
  });

  it("should display error message when field has errors", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    const fieldWithError: FieldApi<FormFields, any, any, any> = {
      ...mockField,
      state: {
        ...mockField.state,
        meta: {
          ...mockField.state.meta,
          isTouched: true,
          errors: ["Invalid email"],
        },
      },
    };

    render(<Input field={fieldWithError} />);

    const errorElement = screen.getByText(/invalid email/i);
    expect(errorElement).toBeInTheDocument();
  });

  it("should display validating message when field is validating", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    const fieldValidating: FieldApi<FormFields, any, any, any> = {
      ...mockField,
      state: {
        ...mockField.state,
        meta: {
          ...mockField.state.meta,
          isValidating: true,
        },
      },
    };

    render(<Input field={fieldValidating} />);

    const validatingElement = screen.getByText(/validating.../i);
    expect(validatingElement).toBeInTheDocument();
  });
});
