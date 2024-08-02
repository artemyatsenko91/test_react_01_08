import { useNavigate, useParams } from "react-router-dom";
import { getContact } from "../services/contacts";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { TagsForm } from "../features/ContactForm/TagsForm";
import { useQuery } from "@tanstack/react-query";
import { ContactInfo } from "../features/ContactsList/ContactCard/components/ContactInfo/ContactInfo";

export const ContactPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["contact", id],
    queryFn: () => getContact(id!),
    staleTime: 0,
  });

  if (isLoading)
    return (
      <Box sx={{ display: "flex", margin: "0 auto" }}>
        <CircularProgress />
      </Box>
    );

  return isSuccess ? (
    <Container>
      <Stack
        direction="column"
        sx={{
          padding: "40px 0",
          maxWidth: "600px",
          margin: "0 auto",
          gap: "20px",
        }}
      >
        <Button
          variant="text"
          onClick={() => navigate(-1)}
          sx={{ maxWidth: "100px" }}
        >
          Back
        </Button>
        <Stack direction="row" sx={{ gap: "30px" }}>
          <img
            src={data?.resources[0].avatar_url}
            alt={data?.resources[0].id}
          />
          <ContactInfo data={data?.resources[0].fields}/>
        </Stack>
        <Stack sx={{ gap: "20px" }}>
          <Typography variant="subtitle1" sx={{ fontSize: "24px" }}>
            Tags
          </Typography>
          <Stack direction="row" sx={{ gap: "10px" }}>
            {data?.resources[0].tags.map((item) => (
              <Chip label={item.tag} key={item.id} />
            ))}
          </Stack>
          <TagsForm id={id!} />
        </Stack>
      </Stack>
    </Container>
  ) : null;
};
