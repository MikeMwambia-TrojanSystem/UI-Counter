import Typography from "@mui/material/Typography";
import useSWR from "swr";
import Box from "@mui/material/Box";
import Paper from '@mui/material/Paper';
import {useState} from "react";
import AppHeader from "../components/header";
import Container from "@mui/material/Container";
import { useSearchParams } from 'next/navigation';
import LinearProgress from "@mui/material/LinearProgress";
import { getData } from "./api/get/getData.js";
import IconButton from '@mui/material/IconButton';
import Link from 'next/link';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

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
  //ensure mpesa payment code passed to url is same 
  //as the one saved in the order record retrieved below
  //before you display any information
  const { data: order } = useSWR(`readorder?id=${order_id}`,getData,{revalidateOnMount:true});

  if (!order)
    return (
      <div>
        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        MPESA pay code  4QA3456G Payment recieved
        </Typography>
        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        POKT recieving address :- 
        </Typography>
        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        pokt132v39vh24y7z8hyhs43fq5pezuasfmt2smq3gl
        </Typography>
        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Ethereum amount :- 0.5
        </Typography>
        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Amount paid in Kshs :- 100,000
        </Typography>
        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Order status is :- Completed
        </Typography>
        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        It takes approximately 15 secs for the Ethereum 
        to be sent out and reflect on pokt132v39vh24y7z8hyhs43fq5pezuasfmt2smq3gl
        <br/>
        After which the order status is updated.
        </Typography>
      </div>
  );



  return (
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
        It takes approximately 15 secs for the Ethereum 
        to be sent out and reflect on {order[0].crypto_address}.
        <br/>
        After which the order status is updated.
        </Typography>
      </div>

      <div>
          <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
            For support call Kang'ethe traders on 0751-204-038.
          </Typography>
          <Link href="/dashboard" rel="noopener noreferrer" underline="hover">
            Back to Dashboards page
          </Link>
      </div>
      </Box>
      </Paper>
      </Container>
      );
}

/*
Next version of UI

<Link href="#" underline="hover"
onClick={() => {
          const asset_treasury = order[0].asset_treasury;
          getHistory(asset_treasury);
        }}>
  Wallet history
</Link>

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
*/