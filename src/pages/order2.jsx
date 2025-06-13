import {useState} from "react"
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AppHeader from "../components/header";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { useRouter,useSearchParams } from 'next/navigation';
import { updateOrder }  from "./api/post/order.js";
import { isAddressValid }  from "./api/post/treasury.js";
import { getBalInEth_ } from "../pages/api/post/treasury.js";

const theme = createTheme();

export default function Order2() {

  const searchParams = useSearchParams();

  const router = useRouter();

  const order_id = searchParams.get('x');

  const asset_treasury = searchParams.get('o');

  const cryptoValue = searchParams.get('y');

  const [status,setStatus] = useState(true);


  const _isAddress = async (event) => {

    try{

      let crypto_address = document.getElementById('crypto_address').value ||null;

      let status = await isAddressValid(crypto_address);

      if(status){
        setStatus(false);
      }else{
        setStatus(true);
      }
      
    }catch(err){
      return false;
    };
  };



  const handleSubmit = async (event) => {

  event.preventDefault();

  const crypto_address = document.getElementById('crypto_address').value ||null;

  const isAddressS = await isAddressValid(crypto_address);

  const treasuryAmnt = await getBalInEth_(asset_treasury);

  if(treasuryAmnt > cryptoValue){

    if(isAddressS){

      const data = {
        _id:order_id,
        crypto_address:crypto_address,
        form:'order_2'
      };

      const response = await updateOrder('updateorder',data);

      if(response === false){
        alert('Error refresh page and try again');
      }else{
        router.replace({pathname:"/order3",query:{x:response}});
      };

    }else{

      alert('Not a valid address');
    };

  }else{

      alert('Could not be supported');

  };

  };

  return (
      <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Container component="main" maxWidth="sm" sx={{ mb: 2 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>      
      <Box sx={{ m: 1,textAlign:"center" }}>
      <form onSubmit={handleSubmit}>
      <div>
        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Enter the crypto address that will recieve the ethereum: - 
        </Typography>
        <TextField required id="crypto_address" name="crypto_address" 
        fullWidth type="string" variant="standard" onChange={_isAddress}/>
      </div>
      <div sx={{ "& button": { m: 1 } }}>
        <Button
          prefetch={false}
          replace={true}
          disabled={status}
          type="submit"
          size="small">
          Validate Order
        </Button>
      </div>
      </form>
      </Box>
      </Paper>
      </Container>
    </ThemeProvider>
      );
}

