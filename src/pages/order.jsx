import { useRouter,useSearchParams } from 'next/navigation';
import { createOrder } from "../lib/apiClient.js";
import Link from 'next/link';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import CssBaseline from "@mui/material/CssBaseline";
import AppHeader from "../components/header";
import Container from "@mui/material/Container";
import { priceInKshs } from "../utils/ui_utills.js";

export default function Order(props) {

  const router = useRouter();

  const searchParams = useSearchParams();

  const Kshs_price = searchParams.get('Kshs_price');

  const maximum_buy_kshs = searchParams.get('maximum_buy_kshs');

  const dashboardId = searchParams.get('dashboardId');

  const dashboardname = searchParams.get('dashboardname');

  const dollar_rate = searchParams.get('dollar_rate');

  const dollar_price = searchParams.get('dollar_price');

  const minimum_buy = searchParams.get('minimum_buy');

  const asset_treasury = searchParams.get('asset_treasury');

  const handleSubmit = async (event) => {

    event.preventDefault();

    if(dashboardId && Kshs_price){

    const data = {
      dashboardId:dashboardId,
      status:true,//Default start
      order_timestamp:new Date().getTime().toString(),
      Kshs_price:Math.round(Number(Kshs_price)),
      minimum_buy_kshs:Number(minimum_buy),
      asset_treasury:asset_treasury
    };
    
    const response = await createOrder(data);

    if(response === false){
      alert('Error refresh page and try again');
    }else{
      router.replace({pathname:"/order1",query:{x:response,w:maximum_buy_kshs,
        y:minimum_buy,z:Kshs_price,o:asset_treasury}});
    }

    }else {
      alert('Parameter Errors');
    }

  };

  return (

      <Container component="main" maxWidth="sm" sx={{ mb: 2 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>      
      <Box sx={{ m: 1,textAlign:"center" }}>
      <form onSubmit={handleSubmit}>
      <div>
        <Typography variant="body2" sx={{ justifyContent: "center", m: 1 }}>
          Order Details
        </Typography>
         <Typography variant="body2" sx={{ justifyContent: "center", m: 1 }}>
          You are about to order from {dashboardname} dashboard.
          The dollar rate is Kshs {dollar_rate} for every $1.
        </Typography>
        <Typography variant="body2" sx={{ justifyContent: "center", m: 1 }}>
          Minimum purchase is KSHs {minimum_buy} and maximum purchase is KSHs {maximum_buy_kshs}.
        </Typography>
        <Typography variant="body2" sx={{ justifyContent: "center", m: 1 }}>
        The asset price is KSHs {Kshs_price} for 1.0000 Ethereum at a 
        dollar price of ${dollar_price}.
        </Typography>
        
      </div>
      <div sx={{ "& button": { m: 1 } }}>
        <Button
          prefetch={false}
          replace={true}
          type="submit"
          size="small">
          Lock Order
        </Button>
        <Button href="/dashboard" rel="noopener noreferrer">
          Return to dashboard
        </Button>
      </div>
      </form>
      </Box>
      </Paper>
      </Container>

      );
}




/*
unique_code === made up of encrypted Paybill,Timestamp,dollar,usdPrice
status === made up of state of the node to settle the transaction 
whether it has enough crypto and is online to settle the order
dollar_rate === made up of the dollar to Kshs rate of given by the counter
dollar_price === made up of the asset price in $ 
*/