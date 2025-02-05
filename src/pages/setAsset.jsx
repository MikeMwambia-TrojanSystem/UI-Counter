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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


const theme = createTheme();

export default function Asset() {

  const [ isDisabled , setDisabled ] = useState(true);
  const [ isUpdate , setUpdate] = useState(false);
  const [price , setPrice] = useState(0);

  const router = useRouter();

  const searchParams = useSearchParams();

  const id = searchParams.get('x');

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
      alert('Refresh page and try again');
    }
  };

  const handleSubmit = async (event) => {

    setDisabled(true);

    event.preventDefault()

    const data = {
      _id:id,
      name:'ETHEREUM'
    };

    const response = await createAsset('assets',data);

    if(response === false){
      setDisabled(false);
      alert('Error refresh page and try again');
    }else{
      
      router.replace({pathname:"/genMne",query:{x:response}},"/genMne");
    }

  };

  return (
     <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppHeader/>
      <Container component="main" maxWidth="sm" sx={{ mb: 2 }}>
      <Paper variant="outlined" 
      sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
      <Box sx={{ m: 1,textAlign:"center" }}>

      <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Asset Information
      </Typography>

      <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
          Supported asset : - Ethereum (ETH)
      </Typography>

      <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
          Supported chains : - Ethereum Sepolia Testnet
      </Typography>

      <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Select Price Oracle :-
      </Typography>

      <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        <Radio
        checked={true}
        value="Binance"
        name="price-source"
      />
      <label>Binance</label>

      </Typography>

      <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Dollar Price ($) :- {price}
      </Typography>

      
      <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Price update frequency is every 5 seconds.
      </Typography>

      <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        The selected price oracle will update 
        the price during the life of the dashboard
      </Typography>

      <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
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
