import { Container, Stack } from "@mui/material";
import { ContactForm } from "../features/ContactForm/ContactForm";
import { ContactsList } from "../features/ContactsList/ContactsList";

export const HomePage = () => {
  return (
    <Container
      sx={{
        "&.MuiContainer-root": {
          maxWidth: "1280px",
        },
      }}
    >
      <Stack
        sx={{
          display: "grid",
          gridTemplateColumns: "280px 1fr",
          gap: "38px",
          padding: "40px 0",
        }}
      >
        <ContactForm />
        <ContactsList />
      </Stack>
    </Container>
  );
};
