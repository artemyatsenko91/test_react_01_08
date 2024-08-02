import { Stack, styled, TextField } from "@mui/material";
import { FieldApi } from "@tanstack/react-form";
import { IInputProps } from "./types";

const StyledSpan = styled("span")<StyledSpanProps>(({ theme, isError }) => ({
  color: isError ? theme.palette.error.main : theme.palette.text.primary,
  fontSize: "12px",
  lineHeight: "120%",
}));

export const Input: React.FC<IInputProps> = ({ field }) => {
  return (
    <Stack direction="column">
      <TextField
        label={field.name.charAt(0).toUpperCase() + field.name.slice(1)}
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
      />
      <FieldInfo field={field} />
    </Stack>
  );
};

type StyledSpanProps = {
  isError: boolean;
};

const FieldInfo = ({
  field,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
Readonly<{ field: FieldApi<any, any, any, any> }>) => {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <StyledSpan isError>{field.state.meta.errors.join(", ")}</StyledSpan>
      ) : null}
      {field.state.meta.isValidating ? (
        <StyledSpan isError={false}>Validating...</StyledSpan>
      ) : null}
    </>
  );
};
