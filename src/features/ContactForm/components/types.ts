import { FieldApi } from "@tanstack/react-form";

export interface IInputProps {
  field: FieldApi<FormFields, keyof FormFields, undefined, undefined, string>;
//   onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export interface FormFields {
  firstName: string;
  lastName: string;
  email: string;
}
