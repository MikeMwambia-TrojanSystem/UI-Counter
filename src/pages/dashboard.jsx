import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState,useEffect } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import HeaderComponent from "../components/header";
import StickyFooter from "../components/footer";
import MainDashboard from "../components/maindashboard";
import useSWR from "swr";
import { generateActiveDashboards } from "./api/get/activeDashboards.js";

//Theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#78909c",
    },
    secondary: {
      main: "#e0e0e0",
    },
  },
});

const defaultTheme = createTheme();



export default function Dashboard() {

  const { data :dashboards } = useSWR(`ActiveDashboards`,generateActiveDashboards,{ refreshInterval: 5000 });
  console.log(dashboards);

  if (!dashboards)
    return (
      <div>
        <LinearProgress color="inherit" />
      </div>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <CssBaseline />
        <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="lg">
          <HeaderComponent />
           {dashboards.map((dashboard) => {
              return (<MainDashboard dashboard={dashboard}/>);
            })}
        </Container>
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
          }}
        >
          <Container maxWidth="lg">
            <StickyFooter/>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};