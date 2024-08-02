import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  Snackbar,
  Stack,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { IContactCardProps } from "./types";
import { deleteContact } from "../../../services/contacts";
import { useRef, useState } from "react";
import { ContactInfo } from "./components/ContactInfo/ContactInfo";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const ContactCard: React.FC<IContactCardProps> = ({ data }) => {
  const [snackMessage, setSnackMessage] = useState<string>("");
  const cardRef = useRef<HTMLDivElement>(null);

  const client = useQueryClient();

  const { mutate: deleteFn } = useMutation({
    mutationFn: (id: string) => deleteContact(id),
    onSuccess: (response) => {
      client.invalidateQueries({ queryKey: ["contacts"] });
      setSnackMessage(`${response?.data.ids} deleted`);
    },
  });

  const handleClose = () => {
    setSnackMessage("");
  };

  const handleDelete = async (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      const id = cardRef.current?.dataset.id;
      if (id) {
        deleteFn(id);
      }
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  return (
    <Card
      ref={cardRef}
      sx={{
        position: "relative",
        display: "flex",
        gridTemplateColumns: {
          sm: "100px 1fr",
          md: "200px 1fr",
        },
        border: "1px solid black",
        boxShadow: "none",

        "&:hover": {
          boxShadow:
            "0px 2px 2px -1px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 2px 3px 0px rgba(0, 0, 0, 0.12);",
          cursor: "pointer",
        },
      }}
      data-id={data.id}
    >
      <CardMedia
        sx={{ height: 140, width: 200 }}
        image={data.avatar_url}
        title="green iguana"
      />
      <CardContent
        sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <ContactInfo data={data.fields} ignoreLink />
        <Stack direction="row" sx={{ gap: "10px", flexWrap: "wrap" }}>
          {data.tags.map((item) => (
            <Chip label={item.tag} key={item.id} />
          ))}
        </Stack>
        <HighlightOffIcon
          data-test-id="card-delete-button"
          onClick={(e) => handleDelete(e)}
          sx={{ position: "absolute", top: "10px", right: "10px", zIndex: 10 }}
        />
      </CardContent>
      <Snackbar
        open={Boolean(snackMessage)}
        autoHideDuration={6000}
        onClose={handleClose}
        message={snackMessage}
      />
    </Card>
  );
};
