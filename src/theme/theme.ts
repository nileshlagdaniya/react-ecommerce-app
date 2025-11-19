import { createTheme } from "@mui/material/styles";

export const getDesignTokens = (mode: "light" | "dark") => ({
    palette: {
        mode,
        ...(mode === "light"
            ? {
                background: { default: "#f7f7fb" },
            }
            : {
                background: { default: "#0b1020" },
            }),
    },
    components: {
        MuiButton: {
            defaultProps: { disableElevation: true },
        },
    },
});

export const createAppTheme = (mode: "light" | "dark") =>
    createTheme(getDesignTokens(mode));
