import { Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { IContactInfoProps } from "./types";

export const ContactInfo: React.FC<IContactInfoProps> = ({
  data,
  ignoreLink = false,
}) => {
  return (
    <Stack>
      <Stack
        sx={{
          display: "flex",
          gap: "10px",
          flexDirection: {
            md: "column",
            lg: "row",
          },
        }}
      >
        <Typography>
          First name:{" "}
          <strong>{data["first name"] && data["first name"][0].value}</strong>
        </Typography>
        <Typography>
          Last name:{" "}
          <strong>{data["last name"] && data["last name"][0].value}</strong>
        </Typography>
      </Stack>
      <Typography>
        Email:{" "}
        {ignoreLink ? (
          data.email && data.email[0].value
        ) : (
          <Link to={`mailto:${data.email && data.email[0].value}`}>
            {data.email[0].value}
          </Link>
        )}
      </Typography>
    </Stack>
  );
};
