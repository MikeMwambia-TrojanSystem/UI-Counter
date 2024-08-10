import { useRouter,useSearchParams } from 'next/navigation';
import { createOrder }  from "./api/post/order.js";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AppHeader from "../components/header";
import Container from "@mui/material/Container";

const theme = createTheme();

export default function Order(props) {

  const router = useRouter();

  const searchParams = useSearchParams();

  const dollar_rate = searchParams.get('dollar_rate');

  const dollar_price = searchParams.get('dollar_price');

  const asset_type = searchParams.get('asset_type');

  const minimum_buy = searchParams.get('minimum_buy');

  const handleSubmit = async (event) => {

    event.preventDefault();

    if(dollar_price && dollar_rate && asset_type){

    const data = {
      status:props.status,
      dollar_rate:Number(dollar_rate),
      asset_price_usd:Number(dollar_price),
      crypto_amnt:'0'//Default start value
    };
    
    const response = await createOrder('createOrder',data);

    if(response === false){
      alert('Error refresh page and try again');
    }else{
      router.replace({pathname:"/order1",query:{x:response,y:minimum_buy}});
    }

    }else {
      alert('Parameter Errors');
    }

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
        <Typography variant="body2" sx={{ justifyContent: "center", m: 1 }}>
          {asset_type} Order Details
        </Typography>
         <Typography variant="body2" sx={{ justifyContent: "center", m: 1 }}>
          Dollar rate :- {dollar_rate}
        </Typography>
  
        <Typography variant="body2" sx={{ justifyContent: "center", m: 1 }}>
          Asset price in dollars :- {dollar_price}
        </Typography>
        <Typography variant="body2" sx={{ justifyContent: "center", m: 1 }}>
          Minimum purchase :- {minimum_buy}
        </Typography>
        <Typography variant="body2" sx={{ justifyContent: "center", m: 1 }}>
          Status :- {(props.status).toString()}
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
      </div>
      </form>
      </Box>
      </Paper>
      </Container>
    </ThemeProvider>
      );
}



export async function getStaticProps() {

  return {
    props: {
      status: true
    },
  };
  
}


/*
unique_code === made up of encrypted Paybill,Timestamp,dollar,usdPrice
status === made up of state of the node to settle the transaction 
whether it has enough crypto and is online to settle the order
dollar_rate === made up of the dollar to Kshs rate of given by the counter
dollar_price === made up of the asset price in $ 
*/