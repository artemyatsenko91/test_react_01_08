import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ContactCard } from "./ContactCard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Resource } from "../../../types/types";
import * as contactsService from "../../../services/contacts";

jest.mock("../../../services/contacts", () => ({
  deleteContact: jest.fn(),
}));

const queryClient = new QueryClient();

const mockData: Resource = {
  id: "1",
  avatar_url: "https://example.com/avatar.jpg",
  fields: {
    email: [
      {
        value: "test@test.com",
        label: "email",
        modifier: "",
        is_primary: false,
      },
    ],
    "first name": [
      { value: "John", label: "first name", modifier: "", is_primary: false },
    ],
    "last name": [
      { value: "Doe", label: "last name", modifier: "", is_primary: false },
    ],
  },
  tags: [
    { id: "tag1", tag: "Friend" },
    { id: "tag2", tag: "Work" },
  ],
  owner_id: "",
  record_type: "",
};

describe("ContactCard", () => {
  it("should render the contact card correctly with given props", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ContactCard data={mockData} />
      </QueryClientProvider>
    );

    expect(screen.getByText(/John/i)).toBeInTheDocument();
    expect(screen.getByText(/Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/test@test.com/i)).toBeInTheDocument();
    expect(screen.getByText(/Friend/i)).toBeInTheDocument();
    expect(screen.getByText(/Work/i)).toBeInTheDocument();
  });

  it("should call deleteContact and show a snackbar message on successful delete", async () => {
    const mockDelete = jest.fn().mockResolvedValue({ data: { ids: "1" } });
    (contactsService.deleteContact as jest.Mock) = mockDelete;

    render(
      <QueryClientProvider client={queryClient}>
        <ContactCard data={mockData} />
      </QueryClientProvider>
    );

    fireEvent.click(screen.getByTestId("card-delete-button"));

    await waitFor(() => {
      expect(screen.getByText(/deleted/i)).toBeInTheDocument();
    });
  });
});
