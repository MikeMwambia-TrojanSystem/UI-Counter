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
