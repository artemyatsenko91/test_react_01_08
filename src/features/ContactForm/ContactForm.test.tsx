import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ContactForm } from "./ContactForm";
import { createContact } from "../../services/contacts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material";

jest.mock("../../services/contacts");

const queryClient = new QueryClient();
const theme = createTheme(); // або ваш кастомний theme

describe("ContactForm", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render form elements", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <ContactForm />
        </ThemeProvider>
      </QueryClientProvider>
    );

    expect(screen.getByText(/Create Contact/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/FirstName/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/LastName/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add contact/i })
    ).toBeInTheDocument();
  });

  it("should show validation errors for required fields", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <ContactForm />
        </ThemeProvider>
      </QueryClientProvider>
    );

    fireEvent.submit(screen.getByTestId("test-form"));

    await waitFor(() => {
      expect(screen.getByText(/a first name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/a last name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    });
  });

  it("should validate email address", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <ContactForm />
        </ThemeProvider>
      </QueryClientProvider>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "invalid-email" },
    });
    fireEvent.submit(screen.getByTestId("test-form"));

    await waitFor(() => {
      expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
    });
  });

  it.skip("should submit form and call createContact mutation", async () => {
    (createContact as jest.Mock).mockResolvedValue({});

    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <ContactForm />
        </ThemeProvider>
      </QueryClientProvider>
    );

    fireEvent.change(screen.getByLabelText(/FirstName/i), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText(/LastName/i), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.submit(screen.getByTestId("test-form-btn"));

    await waitFor(() => {
      expect(createContact).toHaveBeenCalledWith({
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
      });
    });
  });
});
