import React,{ useEffect,useState } from "react";
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
import { isAddressValid }  from "./api/post/treasury.js";
import useSWR from "swr";
import { getData } from "./api/get/getData.js";
import Link from 'next/link';

const theme = createTheme();

function getSingleDashboard (_id) {

  const { data, error , isLoading } = useSWR(`getsingledashboard?id=${_id}`,getData);

   return {
    dashboard : data,
    isLoading,
    isError: error
  }

};


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

  if( (undefined === dashboard) ||(dashboard.length === 0) ) return null;


  return <DashboardForm dashboard={dashboard[0]}/>;

};
 



function DashboardForm({dashboard}){

    const searchParams = useSearchParams();

    const router = useRouter();

    const id = searchParams.get('x');

    const [validated,setValidated] = React.useState(false);

    const dashboard_ = {
      id:id,
      dashboardname:dashboard.dashboardname,
      dollar_rate:Number(dashboard.dollar_rate),
      origin_Address:dashboard.origin_Address,
      minimum_buy_kshs:Number(dashboard.minimum_buy_kshs)
    };

    const creationTime = new Date(Number(dashboard.creationTime)).toLocaleDateString();

    const expiryTime = new Date(Number(dashboard.expiryTime)).toLocaleDateString();

    const validate = async (origin_Address,asset_treasury) => {

      try{

      const _isaddressT = await isAddressValid(asset_treasury);
      
      const _isaddressW = await isAddressValid(origin_Address);

      if((_isaddressT===true) && (_isaddressW===true)){
        if(asset_treasury.toString() != origin_Address.toString()){
          return true;
        };
        return false;
      }else{
        return false;
      }

      }catch(err){

        return false;

      };

    };


    const editForm = async (event) => {

    event.preventDefault();

    dashboard_.dollar_rate = Number(event.target.dollar_rate.value);

    dashboard_.dashboardname = event.target.dashboardname.value;;

    let _min_buy = (Number(event.target.minimum_buy_kshs.value)>Number(150000))?Number(150000):Number(event.target.minimum_buy_kshs.value);

    dashboard_.minimum_buy_kshs = Number(_min_buy);

    const origin_Address = event.target.origin_Address.value;

    const asset_treasury = event.target.asset_treasury.value;

    const isValid = await validate(origin_Address,asset_treasury);

    if(false === isValid) return alert('Invalid addresses');

    dashboard_.origin_Address = origin_Address;

    const response = await updateDashboard('updatedashboard',dashboard_);

    if(response === false){

      setValidated(false);

      alert('Retry there was an erorr saving dashboard');

    }else{

      router.replace({pathname:"/listDashboard"},"/listDashboard");

    };

  };

    return (
    <>
     <ThemeProvider theme={theme}>
      <CssBaseline />
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
          Creation Time
        </Typography>
        <TextField
        required
        id="creationTime"
        name="creationTime"
        fullWidth
        type="string"
        variant="standard"
        defaultValue={creationTime}
        InputProps={{
          readOnly: true
        }}
        />

        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
          Expiration Time
        </Typography>
        <TextField
        required
        id="expiryTime"
        name="expiryTime"
        fullWidth
        type="string"
        variant="standard"
        defaultValue={expiryTime}
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
          Network supported
        </Typography>
        <TextField
        required
        id="network"
        name="network"
        fullWidth
        type="string"
        variant="standard"
        defaultValue="Ethereum Sepolia Testnet"
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

        <div sx={{ "& button": { m: 2 } }}>
        
          <Button type="submit" size="small">Update Dashboard</Button>
          <Link href="/listDashboard" rel="noopener noreferrer">Cancel</Link>
        </div>
        </form>
        <div>
      <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
      <Link href="/setProfile" rel="noopener noreferrer">Create Dashboard</Link>
      <br/>
      <Link href="/listDashboard" rel="noopener noreferrer">List dashboards</Link>
      <br/>
      <Link href="/dashboard" rel="noopener noreferrer">Buyers page</Link>
      </Typography>
      </div>
      </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  </>
  );
}