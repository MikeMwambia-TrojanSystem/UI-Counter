import { useState } from "react";
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
import { getPrice } from "./api/get/getPrice.js";

const theme = createTheme();

export default function Dashboard() {

  const searchParams = useSearchParams();
  const router = useRouter();
  const [assetInfoD, setassetInfoD] = useState('block');
  const [profileInfoD, setprofileInfoD] = useState('block');
  const [priceInfoD, setpriceInfoD] = useState('block');

  const [treasurySt, settreasurySt] = useState(false);
  const [profileSt, setprofileSt] = useState(true); 
  const [priceInfoSt, setpriceInfoSt] = useState(true);
  const [dashboardSt, setdashboardSt] = useState(true);


  //Treasury Data
  const [assetId,setassetId] = useState(null);
  const [treasuryA,settreasuryA] = useState(null);
  const [withdrawalA,setwithdrawalA] = useState(null);
  const [balanceT,setbalanceT] = useState(null);

  //Profile Data
  const [dollar_rate,setdollar_rate] = useState(null);
  const [name,setname] = useState(null);
  const [paybill,setpaybill] = useState(null);
  const [r_t,setr_t] = useState(null);
  const [minimum_buy_kshs,setminimum_buy_kshs] = useState(null);
  const [maximum_buy_kshs,setmaximum_buy_kshs] = useState(null);

  //Price Info
  const [dollar_price,setdollar_price] = useState(null);

  const id = searchParams.get('y');

  const [profileId, setprofileId] = useState(null);

  const genTreasuryInfo = async (event) => {

    event.preventDefault();

    const treasuryInfo  = await getData(`getbalance?_id=${id}`);
    setassetId(treasuryInfo["asset_id"]);
    settreasuryA(treasuryInfo["treasury"]);
    setwithdrawalA(treasuryInfo["origin_Address"]);
    setbalanceT(treasuryInfo["asset_balance"]);
    //Profile Id
    setprofileId(treasuryInfo["r_i"]);
    //Disable treasury button
    settreasurySt(true);
    //Enable profile info button
    setprofileSt(false);
  };

  const genProfileInfo = async (event) => {

    event.preventDefault();

    if(profileId){
      const profileData = await getData(`getprofile?_id=${profileId}`);
      setdollar_rate(profileData["dollar_rate"]);
      setname(profileData["name"]);
      setpaybill(profileData["paybill"]);
      setr_t(profileData["r_t"]);
      setminimum_buy_kshs(profileData["minimum_buy_kshs"]);
      setmaximum_buy_kshs(profileData["maximum_buy_kshs"]);
    };

    setprofileSt(true);
    setpriceInfoSt(false);

  };


  const getAssetInfo = async (event) => {

    event.preventDefault();

    try {

      const price = await getPrice('api/v3/ticker/price?symbol=ETHUSDT');
      setdollar_price(price.price);
      setpriceInfoSt(true);
      setdashboardSt(false);
    } catch(err) {

      alert('Error try again')

    }

  };



  const setDashboardInfo = async (event) => {

    event.preventDefault();

    const dashboard = {
      dashboardname:name,
      paybill:Number(paybill),
      dollar_rate:Number(dollar_rate),
      r_t:Number(r_t),
      asset_id:assetId,
      asset_treasury:treasuryA,
      origin_Address:withdrawalA,
      maximum_buy_kshs:Number(maximum_buy_kshs),
      minimum_buy_kshs:Number(minimum_buy_kshs),
      orders:0
    };

    const response = await createDashboard('createDashboard',dashboard);

    if(response === false){
      setdashboardSt(false);
      alert('Retry there was an erorr saving dashboard');
    }else {
      router.replace({pathname:"/listDashboard",query:{x:response}},"/listDashboard");
    };
    
  };


  return (
     <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppHeader/>
      <Container component="main" maxWidth="sm" sx={{ mb: 2 }}>
      <Paper variant="outlined" 
      sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>

      <Box sx={{ m: 1,textAlign:"center" }}>

        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
          To create a dashboard generate Treasury,
          Profile and Price Information.
        </Typography>

        <div sx={{ "& button": { m: 2 } }}>
          <Button size="small" 
          disabled={treasurySt}
          onClick={genTreasuryInfo}>
            Generate Treasury Info.
          </Button>
        </div>

          <Box sx={{ display: assetInfoD }}>
            <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
              Treasury Information.
            </Typography>
            <form>
              <Typography variant="body2" color="text.primary" 
              sx={{ m: 1 }}>
                Asset Name : - {assetId}
              </Typography>

              <Typography variant="body2" color="text.primary" 
              sx={{ m: 1 }}>
                Treasury Address :-
              </Typography>
              <Typography variant="body2" color="text.primary" 
              sx={{ m: 1 }}>
                {treasuryA}
              </Typography>

              <Typography variant="body2" color="text.primary" 
              sx={{ m: 1 }}>
              Emergency Withdrawal Address :- 
              </Typography>
              <Typography variant="body2" color="text.primary" 
              sx={{ m: 1 }}>
              {withdrawalA}
              </Typography>
              <Typography variant="body2" color="text.primary" 
              sx={{ m: 1 }}>
                Treasury Balance :- {balanceT}
              </Typography>
            </form>
          </Box>

      </Box>

      <Box sx={{ m: 1,textAlign:"center",display: profileInfoD }}>
        <div sx={{ "& button": { m: 2 } }}>
          <Button size="small" 
          disabled={profileSt}
          onClick={genProfileInfo}>
            Generate Profile Info.
          </Button>
        </div>

        <div>
          <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
              Profile Information.
          </Typography>
          <form>
            <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
              Profile Name : - {name}
            </Typography>
            <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
              Paybill Number :- {paybill}
            </Typography>
            <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
              Dollar to Kshs rate :- {dollar_rate}
            </Typography>
            <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
              Expiry time :- {r_t}
            </Typography>
            <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
              Maximum buy Kshs :- {maximum_buy_kshs}
            </Typography>
            <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
              Minimum buy Kshs :- {minimum_buy_kshs}
            </Typography>
          </form>
          </div>
      </Box>

      <Box sx={{ m: 1,textAlign:"center",display: priceInfoD }}>

        <div sx={{ "& button": { m: 2 } }}>
          <Button size="small" 
          disabled={priceInfoSt}
          onClick={getAssetInfo}>
            Generate Price Info.
          </Button>
        </div>

        <div>
          <form>
            <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
            Current price in dollars : - {dollar_price}
            </Typography>
            <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
            Update frequency : - 5 Seconds
            </Typography>
            <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
            Price oracle : - Binance
            </Typography>
            <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
            Orders : - 0
            </Typography>
            <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
            By clicking publish you will activate the dashboard to start taking orders.
            </Typography>
            <div sx={{ "& button": { m: 2 } }}>
              <Button
                type="submit"
                disabled={dashboardSt}
                onClick={setDashboardInfo}
                size="small">
                Publish Dashboard
              </Button>
            </div>
          </form>
        </div>
      </Box>

      </Paper>
      </Container>
    </ThemeProvider>
  );
}

