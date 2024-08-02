import { Button, Stack, Typography } from "@mui/material";
import { useForm } from "@tanstack/react-form";
import { Input } from "./components/Input";
import { createContact } from "../../services/contacts";
import { returnContactData } from "../../utils/returnContactData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { validateEmail } from "../../utils/validation";

export const ContactForm = () => {
  const client = useQueryClient();

  const { mutate: create } = useMutation({
    mutationFn: createContact,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["contacts"] });
    },
  });

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    onSubmit: async ({ value }) => {
      const data = returnContactData(value);
      create(data);
    },
  });
  return (
    <Stack
      direction="column"
      gap={2}
      sx={{ position: "sticky", top: "20px", height: "max-content" }}
    >
      <Typography variant="subtitle1" sx={{ fontSize: "24px" }}>
        Create Contact
      </Typography>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          await form.handleSubmit();
          form.reset();
        }}
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        data-testid="test-form"
      >
        <form.Field
          name="firstName"
          validators={{
            onChange: ({ value }) =>
              !value
                ? "A first name is required"
                : value.length < 3
                ? "First name must be at least 3 characters"
                : undefined,
            onChangeAsyncDebounceMs: 500,
            onChangeAsync: async ({ value }) => {
              await new Promise((resolve) => setTimeout(resolve, 1000));
              return (
                value.includes("error") && 'No "error" allowed in first name'
              );
            },
          }}
          children={(field) => {
            return (
              <Input
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-expect-error
                field={field}
              />
            );
          }}
        />
        <form.Field
          name="lastName"
          validators={{
            onChange: ({ value }) =>
              !value
                ? "A last name is required"
                : value.length < 3
                ? "Last name must be at least 3 characters"
                : undefined,
            onChangeAsyncDebounceMs: 500,
            onChangeAsync: async ({ value }) => {
              await new Promise((resolve) => setTimeout(resolve, 1000));
              return (
                value.includes("error") && 'No "error" allowed in first name'
              );
            },
          }}
          children={(field) => (
            <Input
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-expect-error
              field={field}
            />
          )}
        />
        <form.Field
          name="email"
          validators={{
            onChange: ({ value }) => {
              return !value
                ? "Email is required"
                : !validateEmail(value)
                ? "Invalid email address"
                : undefined;
            },
            onChangeAsyncDebounceMs: 500,
            onChangeAsync: async ({ value }) => {
              await new Promise((resolve) => setTimeout(resolve, 1000));
              return (
                value.includes("error") && 'No "error" allowed in first name'
              );
            },
          }}
          children={(field) => (
            <Input
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-expect-error
              field={field}
            />
          )}
        />
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button
              variant="contained"
              type="submit"
              disabled={!canSubmit}
              data-testid="test-form-btn"
            >
              {isSubmitting ? "Sending..." : "Add Contact"}
            </Button>
          )}
        />
      </form>
    </Stack>
  );
};
