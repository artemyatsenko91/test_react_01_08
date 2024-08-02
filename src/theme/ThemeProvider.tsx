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
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider theme={theme}>
            <CssBaseline />
            {children}
        </Provider>
    );
};
