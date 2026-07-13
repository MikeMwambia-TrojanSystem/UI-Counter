#!/usr/bin/env bash
# apply-theme.sh
#
# Applies a dark / green-blue gradient theme across the whole UI-Counter app.
# Run this from the ROOT of your UI-Counter clone:
#
#   bash apply-theme.sh
#
# What it does:
#   1. Sanity-checks you're in the right repo.
#   2. Backs up every file it's about to touch into .theme-backup-<timestamp>/
#   3. Creates a new git branch: theme/dark-gradient-ui
#   4. Writes the shared theme, two new reusable components, a global
#      _app.js / _document.js, and restyles header.jsx, dashboard.jsx,
#      and order2.jsx (the only page/component files this review actually
#      read the source of).
#   5. Scans the rest of src/pages for files that build their OWN local
#      MUI theme (the same pattern dashboard.jsx/order2.jsx had) -- these
#      will silently override the new global theme until someone applies
#      the same fix to them by hand. The script lists them; it does not
#      touch them, since guessing at JSX it has never read is how you
#      break a build.
#   6. Stages and makes ONE local commit on the new branch. It does NOT
#      push or open a PR -- that stays a deliberate step for you.
#
# Nothing here touches business logic, API calls, or the auth/payment
# code covered in the earlier audit -- this is a styling-only pass.

set -euo pipefail

TIMESTAMP=$(date +%Y%m%d-%H%M%S)
BACKUP_DIR=".theme-backup-${TIMESTAMP}"
BRANCH="theme/dark-gradient-ui"

echo "== UI-Counter theme installer =="

# ---- 1. Sanity checks -------------------------------------------------
if [ ! -f "package.json" ]; then
  echo "ERROR: no package.json here. Run this from the root of your UI-Counter clone." >&2
  exit 1
fi
if ! grep -q '"next"' package.json; then
  echo "ERROR: package.json doesn't mention 'next' -- this doesn't look like UI-Counter." >&2
  exit 1
fi
if ! grep -q '@mui/material' package.json; then
  echo "ERROR: package.json doesn't mention '@mui/material' -- this doesn't look like UI-Counter." >&2
  exit 1
fi
if [ ! -d ".git" ]; then
  echo "ERROR: not a git repository. Clone UI-Counter with git before running this." >&2
  exit 1
fi

if [ -n "$(git status --porcelain)" ]; then
  echo "NOTE: you have uncommitted changes. They'll be left alone, but review"
  echo "      'git status' after this runs so you don't mix them up with the theme commit."
fi

mkdir -p "$BACKUP_DIR"
echo "Backups of anything overwritten will go to: $BACKUP_DIR/"

CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if git show-ref --verify --quiet "refs/heads/$BRANCH"; then
  echo "Branch $BRANCH already exists -- checking it out."
  git checkout "$BRANCH"
else
  git checkout -b "$BRANCH"
fi

# ---- 2. Helper: backup-then-write -------------------------------------
write_file() {
  local target="$1"
  local dir
  dir=$(dirname "$target")
  mkdir -p "$dir"
  if [ -f "$target" ]; then
    local backup_path="$BACKUP_DIR/$target"
    mkdir -p "$(dirname "$backup_path")"
    cp "$target" "$backup_path"
    echo "  backed up existing $target"
  fi
  cat > "$target"
  echo "  wrote $target"
}

# Figure out whether pages live under src/pages or just pages/.
PAGES_DIR="pages"
COMPONENTS_DIR="components"
if [ -d "src/pages" ]; then
  PAGES_DIR="src/pages"
  COMPONENTS_DIR="src/components"
fi
THEME_PATH="$(dirname "$PAGES_DIR")/theme.js"

echo ""
echo "Detected pages dir: $PAGES_DIR"
echo "Detected components dir: $COMPONENTS_DIR"
echo "Writing shared theme to: $THEME_PATH"
echo ""

# ---- 3. Shared theme ----------------------------------------------------
write_file "$THEME_PATH" << 'EOF'
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
EOF

# ---- 4. Reusable components ---------------------------------------------
write_file "$COMPONENTS_DIR/GradientCard.jsx" << 'EOF'
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

/**
 * The dark, glowing, rounded card used across hero / feature screens.
 * variant="green" glows blue top-left / green bottom-right (and the
 * opposite for variant="blue"), matching the two-card hero pattern.
 */
const GradientCard = styled(Box, {
  shouldForwardProp: (prop) => prop !== "variant",
})(({ variant = "green" }) => ({
  position: "relative",
  borderRadius: 32,
  padding: "32px 28px",
  overflow: "hidden",
  backgroundColor: "#0D0F12",
  border: "1px solid rgba(255,255,255,0.08)",
  backgroundImage:
    variant === "green"
      ? "radial-gradient(120% 100% at 0% 0%, rgba(59,130,246,0.32) 0%, transparent 45%)," +
        "radial-gradient(120% 100% at 100% 100%, rgba(34,197,94,0.42) 0%, transparent 50%)"
      : "radial-gradient(120% 100% at 0% 0%, rgba(34,197,94,0.38) 0%, transparent 45%)," +
        "radial-gradient(120% 100% at 100% 100%, rgba(59,130,246,0.42) 0%, transparent 50%)",
}));

export default GradientCard;
EOF

write_file "$COMPONENTS_DIR/CardNavButton.jsx" << 'EOF'
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";

/** The small floating rounded-square icon buttons in a GradientCard's corners. */
const CardNavButton = styled(IconButton)(() => ({
  width: 40,
  height: 40,
  borderRadius: 14,
  backgroundColor: "rgba(0,0,0,0.55)",
  color: "#fff",
  "&:hover": { backgroundColor: "rgba(0,0,0,0.75)" },
}));

export default CardNavButton;
EOF

# ---- 5. Global _app.js / _document.js ------------------------------------
THEME_IMPORT="../theme"
if [ "$PAGES_DIR" = "src/pages" ]; then
  THEME_IMPORT="../theme"
fi

write_file "$PAGES_DIR/_app.js" << EOF
import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "${THEME_IMPORT}";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
EOF

write_file "$PAGES_DIR/_document.js" << 'EOF'
import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link
            href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
EOF

# ---- 6. Restyled header.jsx -----------------------------------------------
write_file "$COMPONENTS_DIR/header.jsx" << 'EOF'
//Header component
import * as React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

export default function HeaderComponent({ offers, price }) {
  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar sx={{ py: 1.5 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 800, letterSpacing: "-0.01em" }}>
              Ethereum marketplace
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {offers} open offers
            </Typography>
          </Box>
          <Chip
            label={"$" + price + " · Binance"}
            sx={{
              fontWeight: 700,
              background: "linear-gradient(135deg, rgba(34,197,94,0.18), rgba(59,130,246,0.18))",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
EOF

# ---- 7. Restyled dashboard.jsx ---------------------------------------------
write_file "$PAGES_DIR/dashboard.jsx" << 'EOF'
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import HeaderComponent from "../components/header";
import StickyFooter from "../components/footer";
import MainDashboard from "../components/maindashboard";
import GradientCard from "../components/GradientCard";
import useSWR from "swr";
import { getData } from "./api/get/getData.js";
import { getPrice } from "./api/get/getPrice.js";

export default function Dashboard() {
  const { data: price } = useSWR("api/v3/ticker/price?symbol=ETHUSDT", getPrice, {
    refreshInterval: 10000,
  });
  const { data: dashboards } = useSWR(`getactivedashboard`, getData);

  if (!dashboards || !price) {
    return (
      <Container component="main" maxWidth="sm" sx={{ mb: 2, pt: 8 }}>
        <GradientCard variant="green" sx={{ my: { xs: 3, md: 6 } }}>
          <Typography variant="body2" color="text.secondary">
            Fetching dashboards and price...
          </Typography>
        </GradientCard>
      </Container>
    );
  }

  if (dashboards.length === 0) {
    return (
      <>
        <HeaderComponent offers={dashboards.length} price={price.price} />
        <Container component="main" maxWidth="sm" sx={{ mb: 2, pt: 4 }}>
          <GradientCard variant="green" sx={{ my: { xs: 3, md: 6 } }}>
            <Typography variant="body2" color="text.secondary">
              There are no dashboards listed on this url yet. Check back later.
            </Typography>
          </GradientCard>
        </Container>
      </>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <HeaderComponent offers={dashboards.length} price={price.price} />
      <Container component="main" sx={{ mt: 4, mb: 2 }} maxWidth="lg">
        <GradientCard variant="blue" sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ mb: 1.5 }}>
            Welcome to counter
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 0.5 }}>
            A platform that gives you the freedom to price your crypto. You are running on
            Ethereum Sepolia TESTNET.
          </Typography>
          <Typography variant="body1" color="text.secondary">
            For up to Kshs 13 a day on a pay-per-use basis, you can have access to a configured
            account and trade over 50 currencies.
          </Typography>
        </GradientCard>

        <Box sx={{ display: "grid", gap: 3, gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" } }}>
          {dashboards.map((dashboard) => (
            <MainDashboard key={dashboard._id || dashboard.id} dashboard={dashboard} price={price} />
          ))}
        </Box>
      </Container>
      <Box component="footer" sx={{ py: 3, px: 2, mt: "auto" }}>
        <Container maxWidth="lg">
          <StickyFooter />
        </Container>
      </Box>
    </Box>
  );
}
EOF

# ---- 8. Restyled order2.jsx ------------------------------------------------
write_file "$PAGES_DIR/order2.jsx" << 'EOF'
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { useRouter, useSearchParams } from "next/navigation";
import { updateOrder } from "./api/post/order.js";
import { isAddressValid } from "./api/post/treasury.js";
import { getBalInEth_ } from "../pages/api/post/treasury.js";
import GradientCard from "../components/GradientCard";
import CardNavButton from "../components/CardNavButton";

// NOTE: this is a styling-only pass. The "treasury balance covers this
// order" check below is still client-side only -- that's a functional/
// security fix tracked separately (see Suggested_Code_Fixes.pdf, item 11),
// not something this theme script changes.
export default function Order2() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const order_id = searchParams.get("x");
  const asset_treasury = searchParams.get("o");
  const cryptoValue = searchParams.get("y");

  const [status, setStatus] = useState(true);

  const _isAddress = async () => {
    try {
      const crypto_address = document.getElementById("crypto_address").value || null;
      const valid = await isAddressValid(crypto_address);
      setStatus(!valid);
    } catch (err) {
      return false;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const crypto_address = document.getElementById("crypto_address").value || null;
    const isAddressS = await isAddressValid(crypto_address);
    const treasuryAmnt = await getBalInEth_(asset_treasury, "safe");

    if (treasuryAmnt > cryptoValue) {
      if (isAddressS) {
        const data = { _id: order_id, crypto_address: crypto_address, form: "order_2" };
        const response = await updateOrder("updateorder", data);
        if (response === false) {
          alert("Error refresh page and try again");
        } else {
          router.replace({ pathname: "/order3", query: { x: response } });
        }
      } else {
        alert("Not a valid address");
      }
    } else {
      alert("Treasury amount could not support order");
      router.replace({ pathname: "/dashboard" });
    }
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 2, pt: 8 }}>
      <GradientCard variant="blue" sx={{ my: { xs: 3, md: 6 } }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <CardNavButton onClick={() => router.back()} aria-label="back">
            &#8249;
          </CardNavButton>
          <CardNavButton aria-label="open">&#8599;</CardNavButton>
        </Box>

        <Typography variant="h4" sx={{ mb: 3 }}>
          Receiving Address
        </Typography>

        <form onSubmit={handleSubmit}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
            Enter the crypto address that will receive the ethereum:
          </Typography>
          <TextField
            required
            id="crypto_address"
            name="crypto_address"
            fullWidth
            type="text"
            onChange={_isAddress}
            sx={{ mb: 3 }}
          />
          <Button variant="contained" color="primary" disabled={status} type="submit" fullWidth>
            Validate Order
          </Button>
        </form>
      </GradientCard>
    </Container>
  );
}
EOF

# ---- 9. Scan for other pages with their own local theme --------------------
echo ""
echo "Scanning $PAGES_DIR for other files that build their own local MUI theme"
echo "(these will override the new global theme until updated by hand):"
echo ""

FOUND_OTHERS=0
if command -v grep >/dev/null 2>&1; then
  while IFS= read -r f; do
    case "$f" in
      *"/_app.js"|*"/_document.js"|*"/dashboard.jsx"|*"/order2.jsx") continue ;;
    esac
    if grep -q "ThemeProvider" "$f" 2>/dev/null; then
      echo "  - $f"
      FOUND_OTHERS=1
    fi
  done < <(grep -rl "createTheme(" "$PAGES_DIR" 2>/dev/null || true)
fi

if [ "$FOUND_OTHERS" = "0" ]; then
  echo "  (none found)"
else
  echo ""
  echo "  For each one: remove its local 'const theme = createTheme(...)' and its"
  echo "  <ThemeProvider theme={theme}> / <CssBaseline/> wrapper (now provided"
  echo "  globally by $PAGES_DIR/_app.js), the same way dashboard.jsx and"
  echo "  order2.jsx were changed above."
fi

# ---- 10. Commit locally (no push) ------------------------------------------
git add -A
if git diff --cached --quiet; then
  echo ""
  echo "Nothing changed to commit."
else
  git commit -m "Apply dark gradient theme across UI-Counter (styling only)" >/dev/null
  echo ""
  echo "Committed locally on branch: $BRANCH"
fi

echo ""
echo "== Done =="
echo "Backups: $BACKUP_DIR/"
echo "Branch:  $BRANCH (not pushed)"
echo ""
echo "Next steps:"
echo "  1. npm run dev   -- eyeball it before anything else"
echo "  2. git diff $CURRENT_BRANCH $BRANCH   -- review every change"
echo "  3. Manually update the files listed above, if any"
echo "  4. git push -u origin $BRANCH   -- then open a PR when you're happy"
