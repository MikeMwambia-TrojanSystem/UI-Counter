import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LinearProgress from "@mui/material/LinearProgress";
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import HeaderComponent from "../components/header";
import StickyFooter from "../components/footer";
import MainDashboard from "../components/maindashboard";
import useSWR from "swr";
import Error from 'next/error';
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


export default function Dashboard(props) {

  //We cannot use this method to get dashboards 
  //instead we use design document that takes url 
  //and returns all  ACTIVE dashboards
  //The below getAllDashboards is for settings page alone

  const { data : dashboards } = useSWR(`getAllDashboards`,getData);
  const { data : price } = useSWR('api/v3/ticker/price?symbol=ETHUSDT',getPrice
    ,{ refreshInterval: 5000 });

  if (!dashboards)
    return (
      <div>
        Generating dashboard refresh page.
      </div>
    );

  if (!price)
    return (
      <div>
        <LinearProgress color="inherit" />
      </div>
    );

  if(!props){
    return <Error statusCode={404}/>
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
          <HeaderComponent />
           {dashboards.map((dashboard) => {
              return (<MainDashboard dashboard={dashboard}
                price={price}/>);
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
}

