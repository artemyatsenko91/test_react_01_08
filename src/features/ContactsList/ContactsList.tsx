import { CircularProgress, Stack, Typography } from "@mui/material";

import { ContactCard } from "./ContactCard/ContactCard";
import { getContacts } from "../../services/contacts";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export const ContactsList = () => {
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["contacts"],
    queryFn: getContacts,
  });

  return (
    <Stack direction="column" sx={{ gap: "16px" }}>
      <Typography variant="subtitle1" sx={{ fontSize: "24px" }}>
        Contacts
      </Typography>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Stack sx={{ gap: "20px" }}>
          {isSuccess &&
            data.resources.map((item) => (
              <Link
                to={`/contact/${item.id}`}
                key={item.id}
                style={{ textDecoration: "none" }}
              >
                <ContactCard data={item} />
              </Link>
            ))}
        </Stack>
      )}
    </Stack>
  );
};
