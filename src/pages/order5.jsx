import Typography from "@mui/material/Typography";
import useSWR from "swr";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AppHeader from "../components/header";
import Container from "@mui/material/Container";
import { useSearchParams } from 'next/navigation';
import TextField from "@mui/material/TextField";
import LinearProgress from "@mui/material/LinearProgress";
import { getData } from "./api/get/getData.js";


const theme = createTheme();

function getSingleOrder (_id) {

  const { data,error,isLoading } = useSWR(`readOrder?id=${_id}`,getData,{revalidateOnMount:true});

   return {
    data : data,
    isLoading,
    isError: error
  }

};

export default function Order5() {

  const searchParams = useSearchParams();

  const order_id = searchParams.get('x');

  let { data, isLoading, isError }  = getSingleOrder(order_id)

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
        MPESA pay code SCT0IRW5US -- Payment recieved
        </Typography>
        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Ethereum recieving address :- 
        </Typography>
        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        0x2442F0A5Bd476a64baa61641Bb9f5A0bb42EC875
        </Typography>
        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Status :- Awaiting blockchain confirmation 
        </Typography>
      </div>
      <div sx={{ "& button": { m: 1 } }}>
        <Button
          href="/dashboard"
          prefetch={false}
          replace={true}
          size="small">
          Back to Dashboard
        </Button>
      </div>
      <div sx={{ "& button": { m: 1 } }}>
      <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Previous transactions :- 
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

