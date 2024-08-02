import { render, screen, waitFor } from "@testing-library/react";
import { getContacts } from "../../services/contacts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ContactsList } from "../ContactsList/ContactsList";

jest.mock("../../services/contacts");

const queryClient = new QueryClient();

describe("ContactsList", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should display a loading indicator while fetching contacts", () => {
    (getContacts as jest.Mock).mockReturnValue(new Promise(() => {}));

    render(
      <QueryClientProvider client={queryClient}>
        <ContactsList />
      </QueryClientProvider>
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it.skip("should display contacts when data is successfully fetched", async () => {
    const mockData = {
      resources: [
        {
          id: "1",
          avatar_url: "avatar1.jpg",
          fields: [
            {
              label: "first name",
              modifier: "",
              value: "John",
              is_primary: false,
            },
          ],
          tags: [],
        },
        { id: "2", avatar_url: "avatar2.jpg", fields: {}, tags: [] },
      ],
    };
    (getContacts as jest.Mock).mockReturnValue(mockData);

    render(
      <QueryClientProvider client={queryClient}>
        <ContactsList />
      </QueryClientProvider>
    );
    await waitFor(() => {
      expect(screen.findByText(/John/i)).toBeInTheDocument();
    });
  });
});
