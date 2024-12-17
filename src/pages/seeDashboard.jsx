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
import { priceInKshs } from "../utils/ui_utills.js";


const theme = createTheme();

export default function Dashboard() {

  const searchParams = useSearchParams();
  const router = useRouter();

  const [treasurySt, settreasurySt] = useState(true);
  const [profileSt, setprofileSt] = useState(false); 
  const [priceInfoSt, setpriceInfoSt] = useState(true);
  const [priceInfoStKshs,setpriceInfoStKshs] =useState(true);
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
  const [dislayTime,setDisplayTime] = useState(null);
  const [minimum_buy_kshs,setminimum_buy_kshs] = useState(null);
  const [maximum_buy_kshs,setmaximum_buy_kshs] = useState(null);

  //Price Info
  const [dollar_price,setdollar_price] = useState(null);
  const [kshs_price,setKshs_price] = useState(null);


  const id = searchParams.get('y');

  const [profileId, setprofileId] = useState(null);
  
  //@Bug here activate the button even if the server returns a 502
  //it should not

  const genTreasuryInfo = async (event) => {

      event.preventDefault();

      try {

        if(!id){
          return;
        };

        const treasuryInfo  = await getData(`getbalance?_id=${id}`);

        setassetId('ETHEREUM');
        settreasuryA(treasuryInfo["treasury"]);
        setwithdrawalA(treasuryInfo["origin_Address"]);
        setbalanceT(treasuryInfo["asset_balance"]);

        if(false != treasuryInfo){

        //Disable treasury button
        settreasurySt(true);

        //Enable price info button
        setpriceInfoSt(false);

        };

      }catch(err){

        alert('Error generating treasury information');
      };
  };

  const genProfileInfo = async (event) => {

    event.preventDefault();

    try{

      setprofileId(id);

      if(!profileId){
        return;
      };

      const profileData = await getData(`getprofile?_id=${profileId}`);

      setdollar_rate(profileData["dollar_rate"]);
      setname(profileData["name"]);
      setpaybill(profileData["paybill"]);

      const creationDate = new Date(Number(profileData["r_t"])).toLocaleDateString() || null;
      setr_t(profileData["r_t"]);
      setDisplayTime(creationDate);

      setminimum_buy_kshs(profileData["minimum_buy_kshs"]);
      setmaximum_buy_kshs(profileData["maximum_buy_kshs"]); 

      if(Number(profileData["dollar_rate"])>1){
      setprofileSt(true);
      settreasurySt(false);
      };

    }catch(err){

      alert('Error generating profile information');
    };
  };


  const getAssetInfo = async (event) => {

    event.preventDefault();

    try {

      const price = await getPrice('api/v3/ticker/price?symbol=ETHUSDT');

      setdollar_price(price.price);

      if(price.price >Number(100)){
      setpriceInfoSt(true);
      setpriceInfoStKshs(false);
      };

    }catch(err){

      alert('Could not fetch price');
    };
  };


  const getKshsPrice = async(event) => {

    event.preventDefault();

    try{

      const _Kshs_price = await priceInKshs(dollar_price,dollar_rate);

      if(_Kshs_price >Number(10000)){
      setKshs_price(_Kshs_price);
      setpriceInfoStKshs(true);
      setdashboardSt(false);
      };

    }catch(err){

      alert('Could not fetch Kshs price');

    };

  };



  const setDashboardInfo = async (event) => {

    event.preventDefault();

    try{

      const dashboard = {
        _id:id,
        dashboardname:name,
        paybill:Number(paybill),
        dollar_rate:Number(dollar_rate),
        r_t:r_t,
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
        router.replace({pathname:"/listDashboard"},"/listDashboard");
      };

    }catch(err){

      alert('Could not set dashbaord information');
    };
    
  };


  return (
     <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppHeader/>
      <Container component="main" maxWidth="sm" sx={{ mb: 2 }}>
      <Paper variant="outlined" 
      sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>

      <Box sx={{m: 1,textAlign:"center"}}>

      <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
          To create a dashboard generate Profile,
          Treasury and Price Information.
      </Typography>


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
              Creation time :- {dislayTime}
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

      <Box sx={{ m: 1,textAlign:"center" }}>

        <div sx={{ "& button": { m: 2 } }}>
          <Button size="small" 
          disabled={treasurySt}
          onClick={genTreasuryInfo}>
            Generate Treasury Info.
          </Button>
        </div>

          <Box>
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
              Withdrawal Address :- 
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


      <Box sx={{ m: 1,textAlign:"center" }}>

        <div sx={{ "& button": { m: 2 } }}>
          <Button size="small" 
          disabled={priceInfoSt}
          onClick={getAssetInfo}>
            Generate $ Price.
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
          </form>
        </div>

      </Box>


      <Box sx={{ m: 1,textAlign:"center" }}>

        <div sx={{ "& button": { m: 2 } }}>
          <Button size="small" 
          disabled={priceInfoStKshs}
          onClick={getKshsPrice}>
            Generate Kshs Price.
          </Button>
        </div>

        <div>
          <form>
            <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
            Current price in Kshs : - {kshs_price}
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
};

