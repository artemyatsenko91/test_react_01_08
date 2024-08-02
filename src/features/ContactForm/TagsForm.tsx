import { Button, Stack, Typography } from "@mui/material";
import { useForm } from "@tanstack/react-form";
import { Input } from "./components/Input";
import { updateContact } from "../../services/contacts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const TagsForm = ({ id }: { id: string }) => {
  const client = useQueryClient();
  const { mutate: update } = useMutation({
    mutationFn: ({ id, tags }: { id: string; tags: string[] }) => updateContact(id, tags),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["contact"] });
    },
  });

  const form = useForm({
    defaultValues: {
      tag: "",
    },
    onSubmit: async ({ value }) => {
      const parsedValue = value.tag.split(",");
      update({ id, tags: parsedValue });
    },
  });
  return (
    <Stack
      direction="column"
      gap={2}
      sx={{ position: "sticky", top: "20px", height: "max-content" }}
    >
      <Typography variant="subtitle1" sx={{ fontSize: "24px" }}>
        Add tags
      </Typography>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          await form.handleSubmit();
          form.reset();
        }}
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <form.Field
          name="tag"
          validators={{
            onChange: ({ value }) => (!value ? "A tag is required" : undefined),
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
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button variant="contained" type="submit" disabled={!canSubmit}>
              {isSubmitting ? "Adding..." : "Add tag"}
            </Button>
          )}
        />
      </form>
    </Stack>
  );
};
