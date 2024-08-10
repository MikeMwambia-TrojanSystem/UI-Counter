import { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import AppHeader from "../components/header";
import {createAsset}  from "./api/post/asset.js";
import { useRouter,useSearchParams } from 'next/navigation';
import { getPrice } from "./api/get/getPrice.js";


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
  const [ isUpdate , setUpdate] = useState(false);
  const [price , setPrice] = useState(0);

  const router = useRouter();

  const searchParams = useSearchParams();

  const id = searchParams.get('x');

  const timestamp = searchParams.get('y');

  const handleChange = (event) => {
    setDisabled(false);
  };

  const getPriceF = async (event) => {
    try{

      const price = await getPrice('api/v3/ticker/price?symbol=ETHUSDT');
      setPrice(price.price);
      setUpdate(true);
      setDisabled(false);

    }catch(err){
      //Keep the price at 0 still
    }
  };

  const handleSubmit = async (event) => {

    setDisabled(true);

    event.preventDefault()

    const data = {
      _id:'ETH',
      status:false,
      dollar_price:Number(price),
      min_buy_dollar:Number(1),
      r_t:Number(timestamp)
    };

    const response = await createAsset('assets',data);

    if(response === false){
      setDisabled(false);
      alert('Error refresh page and try again or try a different asset');
    }else{
      
      router.replace({pathname:"/genMne",query:{x:id,y:'ETH',z:timestamp}},"/genMne");
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
        Asset Information
      </Typography>
      <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
          Supported asset : - Ethereum (ETH)
      </Typography>
      <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
          Supported chains : - Ethereum Mainnet
      </Typography>
      <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Select Price Oracle :-
      </Typography>
      <input type="radio" id="ETH" name="support_crypto" 
      value="binance" selected="selected"/>
      <label>Binance</label>
      <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Dollar Price ($) :- {price}
      </Typography>
      <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
      <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Price update frequency is every 5 seconds.
      </Typography>
      <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        The selected price oracle will update 
        the price during the life of the dashboard
      </Typography>
      <Button
        type="submit"
        disabled={isUpdate}
        onClick={getPriceF}
        size="small">
        Update Price
      </Button>
      </Typography>

      <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Minimum Sell Amnt : $1
      </Typography>
      <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Maximum Sell Amnt (Kshs) : 150000 
      </Typography>

      <div sx={{ "& button": { m: 2 } }}>
      <Button 
      type="submit"
      disabled={isDisabled}
      onClick={handleSubmit} 
      size="small">
        Save
      </Button>
      </div>
      </Box>
      </Paper>
      </Container>
    </ThemeProvider>
  );
}
