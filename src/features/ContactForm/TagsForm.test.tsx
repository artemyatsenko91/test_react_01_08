import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { TagsForm } from "./TagsForm";
import { updateContact } from "../../services/contacts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material";

jest.mock("../../services/contacts");

const queryClient = new QueryClient();
const theme = createTheme(); // або ваш кастомний theme

describe("TagsForm", () => {
  const id = "test-id";

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render form elements", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <TagsForm id={id} />
        </ThemeProvider>
      </QueryClientProvider>
    );

    expect(screen.getByText(/Add tags/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Tag/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add tag/i })
    ).toBeInTheDocument();
  });

  it("should show validation errors for required fields", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <TagsForm id={id} />
        </ThemeProvider>
      </QueryClientProvider>
    );

    fireEvent.submit(screen.getByTestId("tags-test-form"));

    await waitFor(() => {
      expect(screen.getByText(/a tag is required/i)).toBeInTheDocument();
    });
  });

  it.skip("should submit form and call updateContact mutation", async () => {
    (updateContact as jest.Mock).mockResolvedValue({});

    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <TagsForm id={id} />
        </ThemeProvider>
      </QueryClientProvider>
    );

    fireEvent.change(screen.getByLabelText(/Tag/i), {
      target: { value: "tag1,tag2,tag3" },
    });
    fireEvent.submit(screen.getByTestId("tags-test-form"));

    await waitFor(() => {
      expect(updateContact).toHaveBeenCalledWith(id, ["tag1", "tag2", "tag3"]);
    });
  });
});
