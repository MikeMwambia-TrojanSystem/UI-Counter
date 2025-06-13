
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
import { getReciept }  from "./api/get/getReciept.js";

const theme = createTheme();

export default function Order4() {

  const searchParams = useSearchParams();

  const router = useRouter();

  const order_id = searchParams.get('x');

  const [status,setStatus] = useState(true);

  const handleSubmit = async (event) => {

  event.preventDefault();

  const pay_code = event.target.pay_code.value

  const response = await getReciept(`queryreciept?TransID=${pay_code}`);
  
  if(response.statusText === 'OK'){

    router.replace({pathname:"/order5",query:{x:order_id}},"/order5");

  }else{

    alert('Could not verify code');

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

  return (
      <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Container component="main" maxWidth="sm" sx={{ mb: 2 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>

      <Box sx={{ m: 1,textAlign:"center"}}>

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

      </Paper>
      </Container>
    </ThemeProvider>
    );
}

