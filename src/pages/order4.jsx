import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import {useState} from "react";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AppHeader from "../components/header";
import Container from "@mui/material/Container";
import {useRouter,useSearchParams} from 'next/navigation';
import TextField from "@mui/material/TextField";
import {verifyCode}  from "./api/post/order.js";
import { updateOrder }  from "./api/post/order.js";

const theme = createTheme();

export default function Order4() {

  /*
    Calls query reciept service 
  */

  const searchParams = useSearchParams();

  const router = useRouter();

  const order_id = searchParams.get('x');

  //Pay code
  const [payCode,setpayCode] = useState(null);

  //Form
  const [status,setStatus] = useState(true);
  const [frmDisplay,setfrmDisplay] = useState('block');

  //Order Update
  const [ordDisplay,setordDisplay] = useState('none');
  const [statusO,setStatusO] = useState(true);

  const handleSubmit = async (event) => {

  event.preventDefault();

  const data = {
    pay_code:event.target.pay_code.value
  };

  //Once code is confirmed it updates the order 
  //with payment details
  //NB Validation refuses if amount is not specific as per order

  const response = await verifyCode('confirmCode',data);

  if(response === false){
    setStatus(true);
    alert('Could not verify code');
  }else{
    setStatus(true);
    setpayCode(data.pay_code);
    setfrmDisplay('none');
    setordDisplay('block');
    setStatusO(false);
  };

  };

  const _verifyInput = async(event) => {

    const _code = document.getElementById('pay_code').value ||null;

    if(_code.length>5){
      setStatus(false);
    }else{
      setStatus(true);
    }
  };

  const _updateOrder = async(event) => {

    setStatusO(true);
    setStatus(true);

    const data = {
    pay_code:payCode,
    _id:order_id
    };
    console.log(data);
    setfrmDisplay('none');
    const orderUpdate = await updateOrder('updateOrder',data);

    if(orderUpdate === false){
     alert('Error refresh page and try again');

    }else {
      router.replace({pathname:"/order5",query:{x:order_id}});

    };

  };

  return (
      <ThemeProvider theme={theme}>
      <CssBaseline/>
      <AppHeader/>
      <Container component="main" maxWidth="sm" sx={{ mb: 2 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
      <Box sx={{ m: 1,textAlign:"center",display: frmDisplay}}>
      <form onSubmit={handleSubmit}>
      <div>
        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Enter MPESA payment code below to verify :- 
        </Typography>
        <TextField required id="pay_code" name="pay_code" 
        fullWidth type="string" variant="standard" onChange={_verifyInput}/>
      </div>
      <div sx={{ "& button": { m: 1 } }}>
        <Button
          type="submit"
          prefetch={false}
          disabled={status}
          replace={true}
          size="small">
          Verify
        </Button>
      </div>
      </form>
      </Box>

      <Box sx={{ display: ordDisplay}}>
      <div sx={{ m: 1,textAlign:"center"}}>
        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        MPESA pay code {payCode} -- Payment recieved
        </Typography>
      </div>
      <div sx={{ "& button": { m: 1 },textAlign:"center"}}>
        <Button
          onClick={_updateOrder}
          prefetch={false}
          disabled={statusO}
          replace={true}
          size="small">
          Next
        </Button>
      </div>
      </Box>

      </Paper>
      </Container>
    </ThemeProvider>
    );
}

