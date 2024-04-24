import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AppHeader from "../components/header";
import Container from "@mui/material/Container";

const theme = createTheme();

export default function Instructions() {

  return (
      <ThemeProvider theme={theme}>
      <CssBaseline/>
      <AppHeader/>
      <Container component="main" maxWidth="sm" sx={{ mb: 2 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>      
      <Box sx={{ m: 1,textAlign:"center" }}>
      <form>
      <div>
        <Typography variant="body2" sx={{ justifyContent: "center", m: 1 }}>
          To start selling you need to set up dashboards,you can have upto 20 active dashboards,across all assets at once.
        </Typography>
         <Typography variant="body2" sx={{ justifyContent: "center", m: 1 }}>
          Dashboards contain 3 vital pieces of information :- 
        </Typography>
         <Typography variant="body2" sx={{ justifyContent: "center", m: 1 }}>
          Your dollar rate,this is the Kshs to Dollar rate used on a dashboard to value your dollar denominated digital assets.
          It is also the rate used to close orders for your buyers.
        </Typography>
        <Typography variant="body2" sx={{ justifyContent: "center", m: 1 }}>
          We suggest different dashboards have different dollar rates.
        </Typography>
         <Typography variant="body2" sx={{ justifyContent: "center", m: 1 }}>
          A higher dollar rate means the asset is more expensive to the buyer.
          Likewise a lower dollar rate means the asset is cheaper to the buyer.
        </Typography>
         <Typography variant="body2" sx={{ justifyContent: "center", m: 1 }}>
          Your paybill,this is the paybill number that will recieve payment from the buyer.
          One dashboard can support one single paybill at a time.
        </Typography>
        <Typography variant="body2" sx={{ justifyContent: "center", m: 1 }}>
          Assets supported for sale on that specific dashboard.
          You must support atleast one asset to activate a dashboard.
        </Typography>
        <Typography variant="body2" sx={{ justifyContent: "center", m: 1 }}>
          Dashboards are valid for 7 days before they expire upon expiry,they are unable to execute any orders.
          Dashboards expire if the treasury balance is less than a dollar for more than one week or if the dollar rate has not been upated for more than two weeks.
        </Typography>
        <Typography variant="body2" sx={{ justifyContent: "center", m: 1 }}>
          You need to set up the profile,assets treasuries and withdrawal address for each dashboard.
        </Typography>
      </div>
      <div sx={{ "& button": { m: 1 } }}>
        <Button
          type="submit"
          href="/setProfile"
          prefetch={false}
          replace={true}
          size="small">
          Set up dashboards
        </Button>
      </div>
      </form>
      </Box>
      </Paper>
      </Container>
    </ThemeProvider>
      );
}
