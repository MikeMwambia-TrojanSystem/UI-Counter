import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LinearProgress from "@mui/material/LinearProgress";
import CssBaseline from "@mui/material/CssBaseline";
import AppHeader from "../components/header";
import Container from "@mui/material/Container";
import useSWR from "swr";
import { useRouter,useSearchParams } from 'next/navigation';
import TextField from "@mui/material/TextField";
import { getData } from "./api/get/getData.js";
import { updateOrder }  from "./api/post/order.js";

const theme = createTheme();

function getSingleOrder (_id) {

  const { data,error,isLoading } = useSWR(`readOrder?id=${_id}`,getData,{revalidateOnMount:true});

   return {
    data : data,
    isLoading,
    isError: error
  }

}


export default function Order3() {

  const searchParams = useSearchParams();

  const router = useRouter();

  const order_id = searchParams.get('x');

  let { data, isLoading, isError }  = getSingleOrder(order_id);

  if (isError) return <div>Failed to load refresh page...</div>;

  if (!data)
    return (
      <div>
        <LinearProgress color="inherit" />
      </div>
    );

 const handleSubmit = async (event) => {

  event.preventDefault();

  router.replace({pathname:"/order4",query:{x:order_id}});

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
        The dollar to ksh rate for this transaction is {data.dollar_rate}
        </Typography>
        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        The ethereum price for this transaction in dollars is {data.asset_price_usd}
        </Typography>
        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Make payment of Ksh {data.ksh_amnt} to paybill {data.paybill} to recieve {data.crypto_amnt} Eth in address 
        <br/>
        {data.crypto_address} 
        </Typography>
        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Once you have made payment click next to enter mpesa payment code
        </Typography>
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
};

