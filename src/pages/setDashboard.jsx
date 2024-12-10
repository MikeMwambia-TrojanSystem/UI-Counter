import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import LinearProgress from "@mui/material/LinearProgress";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import AppHeader from "../components/header";
import { useRouter,useSearchParams } from 'next/navigation';
import { createDashboard } from "./api/post/dashboard.js";
import { getData } from "./api/get/getData.js";

const theme = createTheme();

// Split this page into 3 different 
// pages each confirming different info 
// and place this page in between the forms 
// bringing in this infomation

export default function Dashboard() {

  const searchParams = useSearchParams();
  const router = useRouter();

  let id = searchParams.get('y');
  const timestamp = searchParams.get('z');

  const [data, setData] = React.useState(null);
  const [status, setStatus] = React.useState(true);
  //Use different component don't engage different forms

  useEffect(() => {

  async function fetchData() {

  if(!id){
    id = searchParams.get('y');
  };

  const balanceData  = await getData(`getbalance?_id=${id}`);

  if(false !== balanceData){

    let profileId = balanceData["r_i"];
    const profileData = await getData(`getprofile?_id=${profileId}`);

    let assetId = balanceData["asset_id"];
    const assetData = await getData(`getasset?_id=${assetId}`);

    const dashboardData = {};
    dashboardData.balance = balanceData;
    dashboardData.profile = profileData;
    dashboardData.asset = assetData;
    setData(dashboardData);
    setStatus(false);

  }

  };

  fetchData();

  },[]);

  if (!data)
    return (
      <div>
        <LinearProgress color="inherit" />
      </div>
  );

  const handleSubmit = async (event) => {

    event.preventDefault()

    const dashboard = {
      dashboardname:event.target.dashboardname.value,
      paybill:Number(event.target.paybill.value),
      dollar_rate:Number(event.target.dollar_rate.value),
      r_t:Number(event.target.r_t.value),
      asset_id:event.target.asset_id.value,
      asset_treasury:event.target.asset_treasury.value,
      origin_Address:event.target.origin_Address.value,
      maximum_buy_kshs:Number(event.target.maximum_buy_kshs.value),
      minimum_buy_kshs:Number(event.target.minimum_buy_kshs.value),
      orders:0
    };

    const response = await createDashboard('createDashboard',dashboard);

    if(response === false){
      // setDisabled(false);
      alert('Retry there was an erorr saving dashboard');
    }else{
      router.replace({pathname:"/listDashboard"},"/listDashboard");
    }

  }

  return (
     <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppHeader/>
      <Container component="main" maxWidth="sm" sx={{ mb: 2 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>      
      <Box sx={{ m: 1,textAlign:"center" }}>
      <form onSubmit={handleSubmit}>
      <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
          Confirm dashboard information
          Dahsboards are made up of 3 parts 
          Treasury information. 
          Profile information.
          Asset information.
      </Typography>
        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Name D
        </Typography>
        <TextField
          required
          id="dashboardname"
          name="dashboardname"
          fullWidth
          type="string"
          variant="standard"
          defaultValue={data.profile.name}
        />
        
        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
          Paybill D
        </Typography>
        <TextField
        required
        id="paybill"
        name="paybill"
        fullWidth
        type="number"
        variant="standard"
        defaultValue={data.profile.paybill}
        InputProps={{
          readOnly: true
        }}
        />

        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
          Dollar rate D
        </Typography>
        <TextField
        required
        id="dollar_rate"
        name="dollar_rate"
        fullWidth
        type="number"
        variant="standard"
        defaultValue={data.profile.dollar_rate}
        />

        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
          Expiry time D
        </Typography>
        <TextField
        required
        id="r_t"
        name="r_t"
        fullWidth
        type="number"
        variant="standard"
        defaultValue={timestamp}
        InputProps={{
          readOnly: true
        }}
        />

      
        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
          Asset supported D
        </Typography>
        <TextField
        required
        id="asset_id"
        name="asset_id"
        fullWidth
        type="string"
        variant="standard"
        defaultValue={data.balance.asset_id}
        InputProps={{
          readOnly: true
        }}
        />

        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
          Asset treasury D
        </Typography>
        <TextField
        required
        id="asset_treasury"
        name="asset_treasury"
        fullWidth
        type="string"
        variant="standard"
        defaultValue={data.balance.treasury}
        InputProps={{
          readOnly: true
        }}
        />

        {/*Since this is an address test it once again and ensure it's valid*/}
        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
          Asset withdrawal address D
        </Typography>
        <TextField
        required
        id="origin_Address"
        name="origin_Address"
        fullWidth
        type="string"
        variant="standard"
        defaultValue={data.balance.origin_Address}
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
        defaultValue={data.profile.maximum_buy_kshs}
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
        defaultValue={data.profile.minimum_buy_kshs}
        />

        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Current price in dollars : - {data.asset.dollar_price}
        </Typography>

        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Update frequency : - 10 Seconds
        </Typography>

        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Price oracle : - Coin gecko
        </Typography>

        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Orders : - 0
        </Typography>

        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Unique link : {data.profile.unique_link} copyLink button
        </Typography>

        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        By clicking publish you will activate the dashboard to start taking orders.
        </Typography>

        <div sx={{ "& button": { m: 2 } }}>
          <Button
            disabled={status}
            type="submit"
            size="small">
            Publish
          </Button>
        </div>
        </form>
      </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

