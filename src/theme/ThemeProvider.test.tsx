import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "./ThemeProvider";
import { Typography } from "@mui/material";

const TestComponent = () => <Typography variant="h1">Test Heading</Typography>;

describe("ThemeProvider", () => {
  it("should apply theme and render children components", () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByText(/test heading/i)).toBeInTheDocument();

    const heading = screen.getByText(/test heading/i);
    expect(heading).toHaveStyle("font-size: 6rem");
  });
});
