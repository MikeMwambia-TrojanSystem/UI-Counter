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
import TextField from "@mui/material/TextField";

const theme = createTheme();

export default function Order1() {

  const router = useRouter();

  const searchParams = useSearchParams();

  const order_id = searchParams.get('x');

  const handleSubmit = async (event) => {

  event.preventDefault();

  const data = {
    _id:order_id,
    ksh_amnt:event.target.ksh_amnt.value
  };

  const response = await updateOrder('updateOrder',data);

  if(response === false){
    alert('Error refresh page and try again');
  }else{
    router.replace({pathname:"/order2",query:{x:response}});
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
        <TextField required id="ksh_amnt" name="ksh_amnt" 
        fullWidth type="string" variant="standard"/>
      </div>
      <div sx={{ "& button": { m: 1 } }}>
        <Button
          prefetch={false}
          replace={true}
          type="submit"
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

