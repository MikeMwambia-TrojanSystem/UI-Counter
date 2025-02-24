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

const maximum_buy_kshs = searchParams.get('w');

const Kshs_price = searchParams.get('z');

const asset_treasury = searchParams.get('o');

const [amntSpend,setamntSpend] = useState(0);

const [cryptoValue,setcryptoValue] = useState(0);

const [status , setStatus] = useState(true);

const [warning,setWarning] = useState(null);

const [amntB,setAmnt] = useState(null);


const _cryptoAmnt = async (event) => {

    try{

      let amnt = Number(document.getElementById('ksh_amnt').value) ||0;

      if( (amnt>minimum_buy)&&(maximum_buy_kshs>amnt) ){

        setamntSpend(amnt);

        //Sends wei amnt to Backend
        let _cryptoValue = await cryptoAmnt(Kshs_price,amnt) || 0;
        setcryptoValue(_cryptoValue.sign);

        setStatus(false);

        setWarning(null);

        setAmnt(`For Kshs ${amnt} you get ${_cryptoValue.display} Ethereum.`)

      }else{
        
        setWarning(`${amnt} should be less than ${maximum_buy_kshs} and more than 
          ${minimum_buy}`);

        setAmnt(null);

      };


    }catch(err){
      setWarning(`Error occured`);
    };
};

  const handleSubmit = async (event) => {

    event.preventDefault();

    if(order_id){

      const amnt = Number(event.target.ksh_amnt.value);

      if( (amnt>minimum_buy)&&(maximum_buy_kshs>amnt)&&(0 != cryptoValue) ){

        const data = {
          _id:order_id,
          ksh_amnt:amnt,
          crypto_amnt:`${cryptoValue}`,//Ensures it send crypto amnt to backend
          form:'order_1'
        };

        const response = await updateOrder('updateOrder',data);

        if(response === false){
          alert('Error refresh page and try again');
        }else{
          router.replace({pathname:"/order2",query:{x:response,y:cryptoValue,
                                                          o:asset_treasury}});
        };

      };

      return;

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
        Maximum buy per transaction is Kshs {maximum_buy_kshs}.
      </Typography>
      <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Minimum buy per transaction is Kshs {minimum_buy}.
      </Typography>
      <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        {amntB}
      </Typography>
      <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        {warning}
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

