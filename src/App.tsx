import { useEffect, useState } from "react";
import { Resource } from "./types/types";
import { getContacts } from "./services/contacts";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { ContactForm } from "./features/ContactForm/ContactForm";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

function App() {
  const [data, setData] = useState<Resource[]>([]);

  useEffect(() => {
    getContacts().then((data) => setData(data.resources));
  }, []);

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
        <Stack direction="column" sx={{ gap: "16px" }}>
          <Typography variant="subtitle1" sx={{ fontSize: "24px" }}>
            Contacts
          </Typography>
          <Stack sx={{ gap: "20px" }}>
            {data.map((item, index) => (
              <Card
                sx={{
                  position: "relative",
                  display: "grid",
                  gridTemplateColumns: "200px 1fr",
                  border: "1px solid black",
                  boxShadow: "none",

                  "&:hover": {
                    boxShadow:
                      "0px 2px 2px -1px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 2px 3px 0px rgba(0, 0, 0, 0.12);",
                    cursor: "pointer",
                  },
                }}
                key={index}
              >
                <CardMedia
                  sx={{ height: 140 }}
                  image={item.avatar_url}
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.fields["first name"][0].value}{" "}
                    {item.fields["last name"][0].value}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.fields.email[0].value}
                  </Typography>
                  <Stack direction="row">
                    {item.tags.map((item) => (
                      <Box sx={{ backgroundColor: "grey" }} key={item.id}>
                        {item.tag}
                      </Box>
                    ))}
                  </Stack>
                  <HighlightOffIcon
                    sx={{ position: "absolute", top: "10px", right: "10px" }}
                  />
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}

export default App;
