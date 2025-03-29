import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AppHeader from "../components/header";
import Container from "@mui/material/Container";
import { useState } from "react";

const theme = createTheme();

export default function TermsandConditions({props}) {

const [isTaxes, setIsTaxes] = useState(false);
const [isPrices, setIsPrices] = useState(false);
const [isSafe, setIsSafe] = useState(false);
const [iswithdrawalA, setIswithdrawalA] = useState(false);
const [isTrade, setIsTrade] = useState(false);

const handleChange = (event) => {
    if(event.target.name==='taxes'){
      setIsTaxes(event.target.checked);
    }else if(event.target.name==='prices'){
      setIsPrices(event.target.checked);
    }else if(event.target.name==='safety'){
      setIsSafe(event.target.checked);
    }else if(event.target.name==='trades'){
      setIsTrade(event.target.checked);
    }else if(event.target.name==='withdrawalA'){
      setIswithdrawalA(event.target.checked);
    }
};

const status = ()=>{

  if(isTaxes && isPrices && isSafe && isTrade && iswithdrawalA){
      return false;
  }
    return true;
}
  
  return (
      <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Container component="main" maxWidth="sm" sx={{ mb: 2 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>      
      <Box sx={{ m: 1,textAlign:"center" }}>

      <div>
        <Typography variant="body2" sx={{ justifyContent: "left", m: 1 }}>
          We link your PAYBILLS to your digital assets wallets giving you 
          the freedom to price your crypto in Kenyan shillings.
        </Typography>
        <Typography variant="body2" sx={{ justifyContent: "left", m: 1 }}>
          By continuing you agree to the following terms :-
        </Typography>
      </div>

      <div>
        <form>
        <label>
        <input type="checkbox" name="taxes" checked={isTaxes} onChange={handleChange}/>
          It is my responsibility(owner of paybill) to file tax returns.
        </label>
        <br/>
        <label>
        <input type="checkbox" name="prices" checked={isPrices} onChange={handleChange}/>
          It is my responsibility(owner of paybill) to price my assets.
        </label>
        <br/>
        <label>
        <input type="checkbox" name="safety" checked={isSafe} onChange={handleChange}/>
          It is my responsibility(owner of paybill) to ensure safety of my paybill.
        </label>
        <br/>
        <label>
        <input type="checkbox" name="withdrawalA" checked={iswithdrawalA} onChange={handleChange}/>
          The SAFETY and CONTROL of withdrawal address is my responsibility.
        </label>
        <br/>
        <label>
        <input type="checkbox" name="trades" checked={isTrade} onChange={handleChange}/>
          I am responsible for any loss or profits realised from my trades.
        </label>
        <br/>
        <Button
          href="/instructions"
          prefetch={false}
          replace={true}
          size="small"
          disabled={status()}>
          Yeah Wherever
        </Button>
        </form>
      </div>
      </Box>
      </Paper>
      </Container>
    </ThemeProvider>
      );
};
