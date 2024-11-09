import Typography from "@mui/material/Typography";
import useSWR from "swr";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import {useState} from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AppHeader from "../components/header";
import Container from "@mui/material/Container";
import { useSearchParams } from 'next/navigation';
import TextField from "@mui/material/TextField";
import LinearProgress from "@mui/material/LinearProgress";
import { getData,getWalletHistory } from "./api/get/getData.js";

//Copy implementation like in Dashboard page

const theme = createTheme();

function getSingleOrder (_id) {

  const { data,error,isLoading } = useSWR(`readOrder?id=${_id}`,getData,{revalidateOnMount:true});
  //const { walletHistory,error,isLoading } = useSWR(`readOrder?id=${_id}`,getWalletHistory,
   // {revalidateOnMount:true});
  
  //const { data:order } = useSWR(`readOrder?id=${_id}`,getData,{revalidateOnMount:true});
  //const { data:walletHistory } = useSWR(`0xEa2267417720F2288d86f8B2c62f91964f45D650`,getWalletHistory,{revalidateOnMount:true});

  //console.log(order);

  //console.log(walletHistory);

  //return walletHistory;
  return {
    data : data,
    isLoading,
    isError: error
  };

};


//Remove the idea of events instead
//Return the reciept once the transaction goes through by clicking query reciept
//Show the reciept and history of transfers in last week.


export default function Order5() {

  const searchParams = useSearchParams();

  const order_id = searchParams.get('x');

  const [orderStatus,setorderStatus] = useState('Not listening to treasury');

  let { data, isLoading, isError }  = getSingleOrder(order_id);

  if (isError) return <div>Failed to load refresh page...</div>;

  if (!data)
    return (
      <div>
        <LinearProgress color="inherit" />
      </div>
    );




  return (
      <ThemeProvider theme={theme}>
      <CssBaseline/>
      <AppHeader/>
      <Container component="main" maxWidth="sm" sx={{ mb: 2 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>      
      <Box sx={{ m: 1,textAlign:"center" }}>
      <div>
        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        MPESA pay code  {data.pay_code}-- Payment recieved
        </Typography>
        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Ethereum recieving address :- 
        </Typography>
        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        {data.crypto_address}
        </Typography>
        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Ethereum amount :- {data.crypto_amnt}
        </Typography>
        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Amount paid in Kshs :- {data.ksh_amnt}
        </Typography>
        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Status :- request reciept button
        </Typography>
      </div>
      <div sx={{ "& button": { m: 1 } }}>
        <Button
          onClick={navigate}
          prefetch={false}
          replace={true}
          size="small">
          Back to Dashboard
        </Button>
      </div>
      <div sx={{ "& button": { m: 1 } }}>
      <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Previous transactions settled by treasury:- 
      </Typography>
      <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Transaction 1
      </Typography>
      <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Transaction 2
      </Typography>
      <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Transaction 3
      </Typography>
      <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Order counter today and enjoy the freedom to price.
      </Typography>
      </div>
      </Box>
      </Paper>
      </Container>
    </ThemeProvider>
      );
}

