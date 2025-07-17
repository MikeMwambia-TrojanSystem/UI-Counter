
import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState,useEffect } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from "@mui/material/Typography";
import Container from '@mui/material/Container';
import HeaderComponent from "../components/header";
import StickyFooter from "../components/footer";
import Paper from '@mui/material/Paper';
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


const metadata = {
  icons: {
    icon: '/icon.png',
  },
};

const defaultTheme = createTheme();



export default function Dashboard() {

  const { data : price } = useSWR('api/v3/ticker/price?symbol=ETHUSDT',getPrice,{ refreshInterval: 10000 });

  const { data : dashboards } = useSWR(`getactivedashboard`,getData);
  
  if(!dashboards || !price){
    return (
      <>
      <ThemeProvider theme={theme}>
       <CssBaseline />
        <Container component="main" maxWidth="sm" sx={{ mb: 2 }}>
        <Paper variant="outlined" 
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}> 
        <div>
        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
          Fetching dashboards and price...
        </Typography>
        </div>
        </Paper>
        </Container>
     </ThemeProvider>
    </>
    )
  }

  if(dashboards.length===0) {
    return (
      <>
      <ThemeProvider theme={theme}>
       <CssBaseline />
        <Container component="main" maxWidth="sm" sx={{ mb: 2 }}>
        <HeaderComponent offers={dashboards.length} price={price.price}/>
        <Paper variant="outlined" 
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}> 
        <div>
        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
          There are no dashboards listed on this url yet <br/>Check back later.
        </Typography>
        </div>
        </Paper>
        </Container>
     </ThemeProvider>
    </>
  );
}

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
          <div>
-          Welcome to counter a platform that gives you the freedom to price your crypto
-          <br/>
-          You are running on Ethereum Sepolia TESTNET
-          <br/>
-          For upto Kshs 13 @ Day on pay per use basis,
           you can have access to a configured account and trade over 50 currencies
-          </div>
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