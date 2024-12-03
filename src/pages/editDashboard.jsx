import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import LinearProgress from "@mui/material/LinearProgress";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import AppHeader from "../components/header";
import { useRouter,useSearchParams } from 'next/navigation';
import {updateDashboard} from "./api/post/dashboard.js";
import {isAddress}  from "../utils/addressUtills";
import useSWR from "swr";
import { getData } from "./api/get/getData.js";


const theme = createTheme();



function getSingleDashboard (_id) {

  const { data, error , isLoading } = useSWR(`getSingleDashboard?id=${_id}`,
    getData,
    {revalidateOnMount:true});

   return {
    dashboard : data,
    isLoading,
    isError: error
  }

}

export default function EditDashboard() {

  const router = useRouter();

  const searchParams = useSearchParams();

  const id = searchParams.get('x');

  let { dashboard, isLoading, isError }  = getSingleDashboard(id);

  if(isError) return <div>Failed to load refresh page...</div>;

  if (isLoading)
    return (
      <div>
        <LinearProgress color="inherit" />
      </div>
  );


  if(dashboard === false) return <div>Dashboard unavailable...</div>;

  return <DashboardForm dashboard={dashboard}/>;

}
 



function DashboardForm({dashboard}){

    const searchParams = useSearchParams();

    const router = useRouter();

    const id = searchParams.get('x');

    const editForm = async (event) => {

    event.preventDefault()

    const origin_Address = event.target.origin_Address.value;

    const asset_treasury = event.target.asset_treasury.value;

    const _isaddress =await isAddress(origin_Address);
    
    if(!_isaddress) return alert('Asset withdrawal address is not correct');

    const _isaddressT =await isAddress(asset_treasury);

    if(!_isaddressT) return alert('Treasury address is not correct');

    if(origin_Address.toString() === asset_treasury.toString()) return alert('Address should not match');

    const dashboard = {
      id:id,
      dashboardname:event.target.dashboardname.value,
      dollar_rate:Number(event.target.dollar_rate.value),
      origin_Address:event.target.origin_Address.value,
      minimum_buy_kshs:Number(event.target.minimum_buy_kshs.value)
    };

    const response = await updateDashboard('updateDashboard',dashboard);

    if(response === false){

      alert('Retry there was an erorr saving dashboard');

    }else{

      router.replace({pathname:"/listDashboard"},"/listDashboard");

    };

  }

    return (
    <>
     <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppHeader/>
      <Container component="main" maxWidth="sm" sx={{ mb: 2 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>      
      <Box sx={{ m: 1,textAlign:"center" }}>
      <form onSubmit={editForm}>
      <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
          Update dashboard information
      </Typography>
        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Name
        </Typography>
        <TextField
          required
          id="dashboardname"
          name="dashboardname"
          fullWidth
          type="string"
          variant="standard"
          defaultValue={dashboard.dashboardname}
        />
        
        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
          Paybill
        </Typography>
        <TextField
        required
        id="paybill"
        name="paybill"
        fullWidth
        type="number"
        variant="standard"
        defaultValue={dashboard.paybill}
        InputProps={{
          readOnly: true
        }}
        />

        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
          Dollar rate
        </Typography>
        <TextField
        required
        id="dollar_rate"
        name="dollar_rate"
        fullWidth
        type="number"
        variant="standard"
        defaultValue={Number(dashboard.dollar_rate)}
        />

        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
          Creation time
        </Typography>
        <TextField
        required
        id="r_t"
        name="r_t"
        fullWidth
        type="number"
        variant="standard"
        defaultValue={dashboard.r_t}
        InputProps={{
          readOnly: true
        }}
        />
      
        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
          Asset supported
        </Typography>
        <TextField
        required
        id="asset_id"
        name="asset_id"
        fullWidth
        type="string"
        variant="standard"
        defaultValue={dashboard.asset_name}
        InputProps={{
          readOnly: true
        }}
        />

        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
          Asset treasury
        </Typography>
        <TextField
        required
        id="asset_treasury"
        name="asset_treasury"
        fullWidth
        type="string"
        variant="standard"
        defaultValue={dashboard.asset_treasury}
        InputProps={{
          readOnly: true
        }}
        />

        {/*Since this is an address test it once again and ensure it's valid
        and make sure it is not the same as asset treasury*/}
        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
          Asset withdrawal address
        </Typography>
        <TextField
        required
        id="origin_Address"
        name="origin_Address"
        fullWidth
        type="string"
        variant="standard"
        defaultValue={dashboard.origin_Address}
        />

        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
          Maximum buy kshs
        </Typography>
        <TextField
        required
        id="maximum_buy_kshs"
        name="maximum_buy_kshs"
        fullWidth
        type="string"
        variant="standard"
        defaultValue={dashboard.maximum_buy_kshs}
        InputProps={{
          readOnly: true
        }}
        />

        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
          Minimum buy Kshs
        </Typography>
        <TextField
        required
        id="minimum_buy_kshs"
        name="minimum_buy_kshs"
        fullWidth
        type="string"
        variant="standard"
        defaultValue={dashboard.minimum_buy_kshs}
        />

        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Orders : - 0
        </Typography>

        {/*Disable if no changes in the form and 
        if the form has been clicked*/}

        <div sx={{ "& button": { m: 2 } }}>
          <Button
            type="submit"
            size="small">
            Update
          </Button>
        </div>
        </form>
      </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  </>
  );
}