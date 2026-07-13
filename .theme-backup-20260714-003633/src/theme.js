/**
 * Shared MUI theme -- dark / gradient UI applied across the whole app.
 * Written by apply-theme.sh. This is the single source of truth for
 * colors, typography, and component styling across every page; edit it
 * directly for future tweaks instead of re-running the installer.
 */
import { createTheme } from "@mui/material/styles";

const colors = {
  bg: "#0A0B0D",
  paper: "#111318",
  paperBorder: "rgba(255,255,255,0.07)",
  green: "#22C55E",
  greenDark: "#16A34A",
  blue: "#3B82F6",
  blueDark: "#2563EB",
  textPrimary: "#F5F6F8",
  textSecondary: "#9CA3AF",
};

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: colors.green, dark: colors.greenDark, contrastText: "#07130D" },
    secondary: { main: colors.blue, dark: colors.blueDark, contrastText: "#FFFFFF" },
    background: { default: colors.bg, paper: colors.paper },
    text: { primary: colors.textPrimary, secondary: colors.textSecondary },
    divider: colors.paperBorder,
  },
  shape: { borderRadius: 20 },
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 800, letterSpacing: "-0.02em" },
    h2: { fontWeight: 800, letterSpacing: "-0.02em" },
    h3: { fontWeight: 800, letterSpacing: "-0.02em" },
    h4: { fontWeight: 800, letterSpacing: "-0.01em" },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
    subtitle1: { color: colors.textSecondary },
    body2: { color: colors.textSecondary },
    button: { fontWeight: 700, textTransform: "none" },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: colors.bg,
          backgroundImage:
            "radial-gradient(circle at 12% -8%, rgba(34,197,94,0.14), transparent 42%)," +
            "radial-gradient(circle at 88% 108%, rgba(59,130,246,0.14), transparent 42%)",
          backgroundAttachment: "fixed",
          minHeight: "100vh",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: colors.paper,
          border: "1px solid " + colors.paperBorder,
        },
        rounded: { borderRadius: 28 },
        outlined: { borderColor: colors.paperBorder },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(10,11,13,0.72)",
          backdropFilter: "blur(14px)",
          boxShadow: "none",
          borderBottom: "1px solid " + colors.paperBorder,
          color: colors.textPrimary,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingLeft: 26,
          paddingRight: 26,
          paddingTop: 12,
          paddingBottom: 12,
          boxShadow: "none",
        },
        containedPrimary: {
          background: "linear-gradient(135deg, " + colors.green + " 0%, " + colors.greenDark + " 100%)",
          color: "#07130D",
          boxShadow: "0 10px 28px rgba(34,197,94,0.32)",
          "&:hover": {
            background: "linear-gradient(135deg, #34D473 0%, " + colors.green + " 100%)",
            boxShadow: "0 12px 32px rgba(34,197,94,0.42)",
          },
        },
        outlined: { borderColor: colors.paperBorder },
      },
    },
    MuiTextField: {
      defaultProps: { variant: "filled" },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255,255,255,0.05)",
          borderRadius: 14,
          "&:before": { display: "none" },
          "&:after": { display: "none" },
          "&:hover": { backgroundColor: "rgba(255,255,255,0.07)" },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: { color: colors.textPrimary },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255,255,255,0.06)",
          color: colors.textPrimary,
        },
      },
    },
  },
});

theme.appColors = colors;

export default theme;
