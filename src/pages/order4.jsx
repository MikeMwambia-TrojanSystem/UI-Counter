import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AppHeader from "../components/header";
import Container from "@mui/material/Container";
import { useRouter,useSearchParams } from 'next/navigation';
import TextField from "@mui/material/TextField";
import { updateOrder }  from "./api/post/order.js";

const theme = createTheme();

export default function Order4() {

  const searchParams = useSearchParams();

  const router = useRouter();

  const order_id = searchParams.get('x');

  const handleSubmit = async (event) => {

  event.preventDefault();

  const data = {
    _id:order_id,
    pay_code:event.target.pay_code.value
  };

  const response = await updateOrder('updateOrder',data);

  if(response === false){
    alert('Error refresh page and try again');
  }else{
    router.replace({pathname:"/order5",query:{x:response}});
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
        Enter MPESA payment code below :- 
        </Typography>
        <TextField required id="pay_code" name="pay_code" 
        fullWidth type="string" variant="standard"/>
      </div>
      <div sx={{ "& button": { m: 1 } }}>
        <Button
          type="submit"
          prefetch={false}
          replace={true}
          size="small">
          Next
        </Button>
      </div>
      </form>
      <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        How to pay--also have a way of emptying the form field if wrong input instead of alert
      </Typography>
      </Box>
      </Paper>
      </Container>
    </ThemeProvider>
      );
}

