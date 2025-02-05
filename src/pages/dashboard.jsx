
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
import { getData } from "./api/get/getData.js";
import { getPrice } from "./api/get/getPrice.js";

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

  const { data : price } = useSWR('api/v3/ticker/price?symbol=ETHUSDT',
    getPrice,
    { refreshInterval: 10000 });

  const { data : dashboards } = useSWR(`getActiveDashboards`,getData);
  
  if (!dashboards)
    return (
      <div>
        <LinearProgress color="inherit" />
      </div>
  );

  if(dashboards===[]) 
    return (
      <div>
        Welcome to counter a platform that gives you the freedom to price your crypto.
      </div>
  );

  if(undefined===price) 
    return (
      <div>
        Refresh page to load dashboards.
      </div>
  );

  if(false === dashboards)
    return (
      <div>
        Error occured.
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
          <HeaderComponent offers={dashboards.length} price={price.price}/>
           {dashboards.map((dashboard) => {
              return (<MainDashboard dashboard={dashboard} price={price}/>);
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