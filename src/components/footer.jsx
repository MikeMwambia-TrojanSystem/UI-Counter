import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary"  sx={{ margin: 1 }} >
      {" © "}
      <Link color="inherit" href="#">
        Mzynga Technology
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function StickyFooter() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxHeight: "100vh",
      }}
    >
      <CssBaseline/>

      <Box
        component="footer"
        sx={{
          py: 2,
          px: 2,
          mt: "auto",
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm">
            <Link text target="_blank" href="https://forms.gle/1rfPaW1AMDQkrkXK8" 
              rel="noopener noreferrer" underline="none" variant="body2">
              | Log In
            </Link>
            <Link text target="_blank" href="/setUp" 
              rel="noopener noreferrer" underline="none" variant="body2"  sx={{ margin: 1 }} >
              | Sign Up
            </Link>
            <Link text target="_blank" href="https://forms.gle/1rfPaW1AMDQkrkXK8" 
              rel="noopener noreferrer" underline="none" variant="body2"  sx={{ margin: 1 }} >
              | Settings
            </Link>
            <Link text target="_blank" href="https://forms.gle/1rfPaW1AMDQkrkXK8" 
              rel="noopener noreferrer" underline="none" variant="body2"  sx={{ margin: 1 }} >
              | Refresh Interval :- 5 secs
            </Link>
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
}