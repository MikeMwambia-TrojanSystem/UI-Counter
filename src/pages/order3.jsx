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

  const { data,error,isLoading } = useSWR(`readorder?id=${_id}`,getData,{revalidateOnMount:true});

   return {
    data : data,
    isLoading,
    isError: error
  };

};


export default function Order3() {

  const searchParams = useSearchParams();

  const router = useRouter();

  const order_id = searchParams.get('x');

  let { data, isLoading, isError }  = getSingleOrder(order_id);

  if (isError) return <div>Failed to load refresh page...</div>;

  if (!data)
    return (
      <div>
      <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        The ethereum price for this transaction is Ksh 245,000
        </Typography>
        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Make payment of Ksh 18,500 to paybill 4107329 to recieve 0.5 Eth in address 
        <br/>
        pokt132v39vh24y7z8hyhs43fq5pezuasfmt2smq3gl
        </Typography>
        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        For account number enter ORDER2354
        </Typography>
        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Order status is PENDING PAYMENT
        </Typography>
        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Once you have made payment click next to enter mpesa payment code
        </Typography>
      </div>
    );

  if(data.length===0){
    return <div>No record found</div>;
  }

 const handleSubmit = async (event) => {

  event.preventDefault();

  router.replace({pathname:"/order4",query:{x:order_id}});

  };
  
  

  return (
      <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Container component="main" maxWidth="sm" sx={{ mb: 2 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>      
      <Box sx={{ m: 1,textAlign:"center" }}>
      <form onSubmit={handleSubmit}>
      <div>
        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        The ethereum price for this transaction is {data[0].Kshs_price}
        </Typography>
        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Make payment of Ksh {data[0].ksh_amnt} to paybill {data[0].paybill} to recieve {data[0].crypto_amnt} Eth in address 
        <br/>
        {data[0].crypto_address} 
        </Typography>
        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        For account number enter {data[0].pay_code}
        </Typography>
        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Order status is {data[0].status}
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

