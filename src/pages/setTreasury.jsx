import React, { useEffect ,useState} from "react"
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import AppHeader from "../components/header";
import useSWR from "swr";
import { useRouter } from 'next/navigation'
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSearchParams } from 'next/navigation'
import {isAddress}  from "../utils/addressUtills";
import { getData } from "./api/get/getData.js";
import { createTreasury }  from "./api/post/treasury.js";
import { expiryTime }  from "../utils/ui_utills.js";

const theme = createTheme();

export default function Treasury(props) {

  const router = useRouter();

  //Activate or deactivate depending on this state
  const [status, setStatus] = useState(true);
  const [_addressB, set_addressB] = useState(false);
  const [displayTime, setdisplayTime] = useState(null);

  const searchParams = useSearchParams();

  const id = searchParams.get('x');
  const asset_id = searchParams.get('y');
  const timestamp = searchParams.get('z');
  const address = searchParams.get('a');
  
  useEffect(() => {
    async function getTime(timestamp){
      const _current = await expiryTime(timestamp);
      setdisplayTime(_current);
    }

    getTime(timestamp);

  }, []);
  
  const handleSubmit = async (event) => {

    event.preventDefault();

    const data = {
      r_i:id,
      r_t:Number(timestamp),
      origin_Address:event.target.origin_Address.value,
      treasury:address,
      asset_balance:0,
      asset_id:asset_id
    };

    if(data.origin_Address.toString() === data.treasury.toString()) return alert('Address should not match');

    if(!isAddress(data.origin_Address)) return alert('Invalid address');

    const response = await createTreasury('balances',data);

    if(response === false){
      set_addressB(true);
      alert('Retry or confirm withdrawal address');
    }else{
  
      router.replace({pathname:"/seeDashboard",query:{y:response,z:timestamp}},"/seeDashboard");
    }

  };


  const handleChange = async (event) => {
      const setStatu = await isAddress(event.target.value);
      setStatus((setStatu)?false:true);
  };


  return (
     <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppHeader/>

      <Container component="main" maxWidth="sm" sx={{ mb: 2 }}>
      <Paper variant="outlined" 
      sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>      
      <Box sx={{ m: 1,textAlign:"center" }}>

      <form onSubmit={handleSubmit}>
        <Typography variant="body2" color="text.primary" sx={{ m: 1,display: 'inline'}}>
        Treasury Address :- {address}
        </Typography>
        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Treasury address balance : - 0 {asset_id} 
        </Typography>
        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        If the treasury address above expires and there are assets balances on that addrress,
        they are automatically sent 
        to a withdrawal address entered below.
        </Typography>

        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Enter withdrawal address below : - 
        </Typography>

        <TextField required id="origin_Address" name="origin_Address" 
        fullWidth type="string" variant="standard" onChange={handleChange}/>

        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Ensure you are the owner of the address entered above to avoid loss of your assets.
        </Typography>

        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Treasury expiry date :- { displayTime }
        </Typography>

        <div sx={{ "& button": { m: 2 } }}>
          <Button
            type="submit"
            size="small"
            disabled={status}>
            Save Treasury
          </Button>
        </div>
      </form>

      </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
