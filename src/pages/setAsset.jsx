import { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import AppHeader from "../components/header";
import {createAsset}  from "./api/post/asset.js";
import { useRouter,useSearchParams } from 'next/navigation';


// The getting dollar price logic has been moved to
// couch DB service and at this stage of asset creation
// the price will be set to the default 0
// the status will be set to the default false
// If on couch service the bots pick up the asset and update
// the price from picking in coingecko the status updates to true
// The status is a field on the asset that is used to know whether the asset
// is updating
//NB:- This function does not need an update on front or backend/couch service


const theme = createTheme();

export default function Asset() {

  const [ isDisabled , setDisabled ] = useState(true);

  const router = useRouter();

  const searchParams = useSearchParams();

  const id = searchParams.get('x');

  const timestamp = searchParams.get('y');

  const handleChange = (event) => {
    setDisabled(false);
  };

  const handleSubmit = async (event) => {

    setDisabled(true);

    event.preventDefault()

    const selectedV = document.querySelector("input[type='radio'][name=support_crypto]:checked").value;

    const data = {
      _id:selectedV,
      status:false,
      dollar_price:Number(0),
      min_buy_dollar:Number(1),
      r_t:Number(timestamp)
    };

    const response = await createAsset('assets',data);

    if(response === false){
      setDisabled(false);
      alert('Error refresh page and try again or try a different asset');
    }else{
      //router.replace({pathname:"/setTreasury",query:{x:id,y:selectedV,z:timestamp}},"/setTreasury");
      router.replace({pathname:"/genMne",query:{x:id,y:selectedV,z:timestamp}},"/genMne");
    }

  };

  return (
     <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppHeader/>
      <Container component="main" maxWidth="sm" sx={{ mb: 2 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>      
      <Box sx={{ m: 1,textAlign:"center" }}>
      <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        See asset information 
      </Typography>
      <form onSubmit={handleSubmit}>
      <input type="radio" id="ETH" name="support_crypto" value="ETH" onChange={handleChange}/>
      <label>Ethereum token on Ethereum Blockchain</label>
      <br/>
      <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        The price source for this dashboard is coingecko.
      </Typography>
      <div sx={{ "& button": { m: 2 } }}>
      <Button
        disabled={isDisabled}
        type="submit"
        size="small">
        Generate address
      </Button>
      </div>
      </form>
      </Box>
      </Paper>
      </Container>
    </ThemeProvider>
  );
}
