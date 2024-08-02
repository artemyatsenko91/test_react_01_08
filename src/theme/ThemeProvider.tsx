import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider as Provider } from "@mui/material/styles";

const theme = createTheme({
  ...createTheme(),
  breakpoints: {
    values: {
      xs: 0,
      sm: 360,
      md: 768,
      lg: 1280,
      xl: 2560,
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          "&.MuiContainer-root": {
            maxWidth: "1280px",
            "@media (max-width: 1320px)": {
              maxWidth: "100%",
              padding: "0 16px"
            },
          },
        },
      },
    },
  },
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider theme={theme}>
      <CssBaseline />
      {children}
    </Provider>
  );
};
