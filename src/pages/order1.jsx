import React, { useEffect ,useState} from "react"
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AppHeader from "../components/header";
import Container from "@mui/material/Container";
import { useRouter,useSearchParams } from 'next/navigation';
import { updateOrder }  from "./api/post/order.js";
import { balInEth,valInEth } from "../utils/addressUtills.js";
import { balInKshs,cryptoAmnt } from "../utils/ui_utills.js";
import TextField from "@mui/material/TextField";
import useSWR from "swr";
import LinearProgress from "@mui/material/LinearProgress";
import { getData } from "./api/get/getData.js";

const theme = createTheme();

export default function Order1() {

const router = useRouter();

const searchParams = useSearchParams();

const order_id = searchParams.get('x');

const minimum_buy = searchParams.get('y');

const [bal_InKshs,setbal_InKshs] = useState(null);
const [amntSpend,setamntSpend] = useState(0);
const [cryptoValue,setcryptoValue] = useState(0);
const [status , setStatus] = useState(true);

const { data : orders } = useSWR(`readOrder?id=${order_id}`,getData);

//TEST
//const { data : balance } = useSWR(`0x2442F0A5Bd476a64baa61641Bb9f5A0bb42EC875`,balInEth);
// const { data : balance } = useSWR(`${orders.order_treasury}`,balInEth);
const balance = '100';

  if (!balance)
    return (
      <div>
        <LinearProgress color="inherit" />
      </div>
    );

  if (!orders)
    return (
      <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Invalid order
        </Typography>
    );

  const _cryptoAmnt = async (event) => {

    try{

      let _value = await balInKshs(orders.Kshs_price,balance)
      setbal_InKshs(_value);

      let amnt = Number(document.getElementById('ksh_amnt').value) ||0;
      setamntSpend(amnt);

      let _cryptoValue = await cryptoAmnt(orders.Kshs_price,amnt) || 0;
      setcryptoValue(_cryptoValue);

      if((amnt>0) && (_value>amnt) 
        && (amnt>minimum_buy) && (150000>amnt)) {
        setStatus(false);
      }else {
        setStatus(true);
      }

    }catch(err){
      
      return false;
    };
  };

  const handleSubmit = async (event) => {

    event.preventDefault();

    if(order_id && minimum_buy){

      const amnt = Number(event.target.ksh_amnt.value);
      const maximumBy = Number(150000);
      const minimumBy = Number(minimum_buy);

      if((amnt>minimumBy)&&(maximumBy>amnt)&&(bal_InKshs>amnt)){

        const data = {
          _id:order_id,
          ksh_amnt:amnt,
          crypto_amnt:`${cryptoValue}`
        };

        const response = await updateOrder('updateOrder',data);

        if(response === false){
          alert('Error refresh page and try again');
        }else{
          router.replace({pathname:"/order2",query:{x:response}});
        };

      }else{

        alert(`Amount must be greater than Kshs ${minimum_buy} 
          and less than Kshs 150000 or 
          Kshs ${bal_InKshs} whichever is lower`);

      };
    };
  };

  return (
      <ThemeProvider theme={theme}>
      <CssBaseline/>
      <AppHeader/>
      <Container component="main" maxWidth="sm" sx={{ mb: 2 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>      
      <Box sx={{ m: 1,textAlign:"center" }}>
      <form onSubmit={handleSubmit}>
      <div>
        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Enter the Kshs amount you wish to spend below : - 
        </Typography>
        <TextField required="true" id="ksh_amnt" name="ksh_amnt" 
        fullWidth type="number" variant="standard" onChange={_cryptoAmnt}/>
      </div>
      <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Maximum buy per transaction is Kshs 150000.
      </Typography>
      <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Minimum buy per transaction is Kshs {minimum_buy}.
      </Typography>
      <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        {balance} Ethereum available for sale at $1 = {orders.dollar_rate} rate.
      </Typography>
      <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Valued in Kshs at {bal_InKshs}
      </Typography>
      <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        For Kshs {amntSpend} you get {cryptoValue} Ethereum.
      </Typography>
      <div sx={{ "& button": { m: 1 } }}>
        <Button
          prefetch={false}
          replace={true}
          type="submit"
          disabled={status}
          size="small">
          Next
        </Button>
      </div>
      </form>
      </Box>
      </Paper>
      </Container>
    </ThemeProvider>
      );
}

