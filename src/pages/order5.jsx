import Typography from "@mui/material/Typography";
import useSWR from "swr";
import Box from "@mui/material/Box";
import Paper from '@mui/material/Paper';
import {useState} from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AppHeader from "../components/header";
import Container from "@mui/material/Container";
import { useSearchParams } from 'next/navigation';
import LinearProgress from "@mui/material/LinearProgress";
import { getData } from "./api/get/getData.js";

/*
Without history and events
On this page put a loader if response from sender wallet show transhash
Otherwise show a message asking user to wait for 15 secs 
b4 address gets crypto
Remove a lof things in this version including events on this page
just state that crypto is on the way
*/

export default function Order5() {

  const searchParams = useSearchParams();

  const order_id = searchParams.get('x');

  const [eventUI,setEventUI] = useState(false);

  const { data: order } = useSWR(`readOrder?id=${order_id}`,getData,{revalidateOnMount:true});

  if (!order)
    return (
      <div>
        <LinearProgress color="inherit" />
      </div>
  );

  if(order === false)
    return (
      <div>
        Error occured.
      </div>
  );

  if(order === [])
    return (
      <div>
        Refesh page to load order.
      </div>
  );


  if(order[0].transHash==='No transHash'){
    setEventUI(true);
  };


  return (
      <ThemeProvider theme={theme}>
      <CssBaseline/>
      <AppHeader/>
      <Container component="main" maxWidth="sm" sx={{ mb: 2 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>  

      <Box sx={{ m: 1,textAlign:"center" }}>
      <div>
        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        MPESA pay code  {order[0].pay_code}-- Payment recieved
        </Typography>
        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Ethereum recieving address :- 
        </Typography>
        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        {order[0].crypto_address}
        </Typography>
        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Ethereum amount :- {order[0].crypto_amnt}
        </Typography>
        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Amount paid in Kshs :- {order[0].ksh_amnt}
        </Typography>
        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Order status is :- {order[0].status}
        </Typography>
        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        It takes approximately 15 secs for the transactions 
        to be confirmed and settled.
        </Typography>
      </div>
      
      <div>
      {
        /*Next version of UI
          eventUI?attachEvents(order[0].asset_treasury):
         (<Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
            Transaction settled with hash {order[0].transHash}
            Amount is {order[0].crypto_amnt}
          </Typography>)
          */
      }
      <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        For support call Kang'ethe traders on 0751-204-038.
      </Typography>
      </div>

      <div>
          <Link href="#" rel="noopener noreferrer" underline="hover">
            Back to Dashboards page
          </Link>
          {/*Next version of UI
          <Link href="#" underline="hover"
          onClick={() => {
                    const asset_treasury = order[0].asset_treasury;
                    getHistory(asset_treasury);
                  }}>
            Wallet history
          </Link>
          */}
      </div>

      </Box>

      </Paper>
      </Container>
    </ThemeProvider>
      );
}


async function getHistory(address){

    const asset_treasury = address;

  //const { data: treasuryHistory } = useSWR(asset_treasury,getWalletHistory,{revalidateOnMount:true});

    const { data, error , isLoading } = useSWR(address,
                                                        getWalletHistory,
                                                        {revalidateOnMount:true});
    //Draw UI
   return {
    dashboard : data,
    isLoading,
    isError: error
  }
}

//Automatically remove events when you leave page
async function attachEvents(address){
  
  //Attach events to treasury
}

