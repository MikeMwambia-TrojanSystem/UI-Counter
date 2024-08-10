// After 30 days dashboards are purged this means 
// deleting every information on that unique link
// to activate the link you pay a small fee of less than 100@month@link
// with that unique code untill payment is made
// Before then if you top up a dashboard 
// You automatically activate it
// After 7 days if no top up it expires 
// before then the status is awaiting funding
//(Activate above logic in bots also)
// When setting up the dashboard we will have 
// Authorizing transaction where the amount
// in authorizing transaction the amount is different for withdrawal,
// setting up dollar rate and publishing a dashboard
// We also do 2FA where the number
// that is linked to that counter url recieves transaction codes

import React, { useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRouter,useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import LinearProgress from "@mui/material/LinearProgress";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import AppHeader from "../components/header";
import Avatar from "@mui/material/Avatar";
import treasuryQR from "../utils/treasuryQR.js";
import copy from "../utils/copy.js";
import useSWR from "swr";
import { deleteDashboard } from "./api/post/dashboard.js";
import { getData } from "./api/get/getData.js";
import {BN} from 'bn.js';

function getAllDashboards () {

  const { data, error , isLoading} = useSWR('getAllDashboards',getData,{revalidateOnMount:true});

   return {
    dashboards : data,
    isLoading,
    isError: error
  }

}

const theme = createTheme();

export default function listDashboard(){

  const searchParams = useSearchParams();

  const id = searchParams.get('x');


  const { dashboards, isLoading, isError } = getAllDashboards();

  if (isLoading) return <LinearProgress/>;

  if(isError || false === dashboards) return <ErrorComponent message={'Error fetching dashboard'}/>;

  const profile = dashboards.find(dashboard=> dashboard.id === id);

  const otherDashboards = dashboards.filter(dashboard=> dashboard.id !== id);

  return (
    <>
    <List profile={profile} dashboards={otherDashboards}/>
    </>
  );

}

function ErrorComponent({message=null}){
  let _message = message || 'An error occured try again';

  return (
    <>
      <ThemeProvider theme={theme}>
       <CssBaseline />
       <AppHeader/>
        <Container component="main" maxWidth="sm" sx={{ mb: 2 }}>
        <Paper variant="outlined" 
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}> 
        <div>
        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
          {_message}
        </Typography>
        </div>
        </Paper>
        </Container>
     </ThemeProvider>
    </>
    )
}

async function utills(name=null,id=null){

  const router = useRouter();

  switch(name) {

  case '/editDashboard' :

    return router.replace({pathname:name,query:{x:id}},name);

    break;

  case '/listDashboard' :

    return router.replace({pathname:name,query:{x:id}},name);

    break;

  case '/removeDashboard' :

    const response = await deleteDashboard('deleteDashboard',id);

    if(response === false){

    alert('Retry there was an erorr deleting dashboard');

    } else {

    return router.replace({pathname:"/listDashboard"},"/listDashboard");

    }

    break;

  default :

    return;

  }

}


function List({profile,dashboards,isError}){

  return (
    <>
    <ThemeProvider theme={theme}>
       <CssBaseline />
       <AppHeader/>
      <Container component="main" maxWidth="sm" sx={{ mb: 2 }}>
      <Suspense fallback={<LinearProgress/>}>
      <Paper variant="outlined" 
      sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
      <Profile profile={profile}/> 
      <Dashboards dashboards={dashboards}/>
      <div>
      <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
      <Link href="/setProfile">Create</Link>
      <br/>
      <Link href="/listDashboard">List dashboards</Link>
      <br/>
      <Link href="/dashboard">Buyers page</Link>
      </Typography>
      </div>
      </Paper>
      </Suspense>
      </Container>
     </ThemeProvider>
  </>
  );
};



function Profile({profile}){

  const searchParams = useSearchParams();

  const id = searchParams.get('x');

   if(profile){

    return (
      <>
      <ProfileSample profile={profile}/>
      </>
      )

  }else{

    if(id){

      return (
      <>
      
      <div>
      <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Dashboard unavailable
      </Typography>
      </div>
      
      </>
      )

    } else {

      return null;

    }
  }

}

function ProfileSample({profile}){

const [qr, setQr] = React.useState(null);

const router = useRouter();

const edit = (id) => router.replace({pathname:"/editDashboard",query:{x:id}},"/editDashboard");

const _remove = async (id) =>{

  const response = await deleteDashboard('deleteDashboard',id);

  if(response === false){

    alert('Retry there was an erorr deleting dashboard');
  }else{

    router.replace({pathname:"/listDashboard"},"/listDashboard");
  }

}

useEffect(()=>{

    async function fetchQR(asset_treasury){
      const _qr = await treasuryQR(asset_treasury);
      setQr(_qr);
    };

    fetchQR(profile.asset_treasury);

  },[]);

  return (
       <>
       <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
          Top up {profile.dashboardname}.
        </Typography>
       <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
          Send {profile.asset_id} you wish to sell to<br/> 
          {profile.asset_treasury} 
          <IconButton aria-label="copy" size="small" 
            onClick={() => {copy(profile.asset_treasury);}}>
            <ContentCopyIcon fontSize="inherit"/>
          </IconButton>
        </Typography>
        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
          Scan QR code below<br/>
          <Avatar alt="Ethereum" src={qr} 
          sx={{ width: 56, height: 56 }} variant="square"/>
        </Typography>
        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
          The rate is  {profile.dollar_rate} Kenya shilling to 1 dollar.
        </Typography>
        <hr/>
       </>

  );

}


function Dashboards({dashboards}){

  if(dashboards.length === 0){
    return (
    <>
    <div>
    <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
      No other dashboards found on this counter.
    </Typography>
    </div>
    </>
    );
  }else{

    return (
    <>
    <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
      Dashboards
    </Typography>
    {
        dashboards.map((dashboard)=>{

          return (
            <>
            <DrawDashboard data={dashboard} key={dashboard.creationTime}/>
            </>
          )
        })
      }
    </>
    );

  };
}



function DrawDashboard({data}) {

  const dashboard = data;

  const creationDate = new Date(Number(dashboard.creationTime)).toLocaleString();

    //Add one week here
  const oneWeek = new BN(604800000);
  const creationTime = new BN(dashboard.creationTime)
  const expiryTime = creationTime.add(oneWeek).toNumber();
  const displayTime = new Date(expiryTime).toLocaleString();

  const timestamp = new Date().getTime();

  const difference = (Number(timestamp) - Number(new Date(Number(dashboard.creationTime))));

  const ageInDays = (difference/86400000);

  const status = (ageInDays>5)?'Expired':'Active';

  const router = useRouter();

  const auth = () => alert('Withdrawal logic here');

  const edit = (id) => router.replace({pathname:"/editDashboard",query:{x:id}},"/editDashboard");

  const topup = (id) => router.replace({pathname:"/listDashboard",query:{x:id}},"/listDashboard");

  const _remove = async (id) =>{

    const response = await deleteDashboard('deleteDashboard',id);

    if(response === false){

      // setDisabled(false);
      alert('Retry there was an erorr deleting dashboard');
    }else{

      //Bug
      //User has to refresh to get fresh data
      window.location.reload()
    }

  }

  return (
      <>
      <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
          Name : {dashboard.dashboardname}<br/>
          Dollar Rate : {dashboard.dollar_rate}<br/>
          Minimum Buy : {dashboard.minimum_buy_kshs}<br/>
          Paybill : {dashboard.paybill}<br/>
          Asset : {dashboard.asset_id}<br/>
          Asset Treasury Address : {dashboard.asset_treasury}<br/>
          Creation time : {creationDate}<br/>
          Expiry time : {displayTime}<br/>
          Status : {status}
      </Typography>

      <IconButton
      aria-label="copy" 
      size="small"
      onClick={()=>topup(dashboard.id)}
      >
      <AddIcon fontSize="inherit"/>Top up
      </IconButton>

      <IconButton 
      aria-label="copy" 
      size="small"
      disabled={(status === "Expired")?true:false}
      onClick={()=>auth(dashboard.id)}
      >
      <RemoveIcon fontSize="inherit"/>Withdraw
      </IconButton>

      <IconButton 
      aria-label="copy" 
      size="small"
      onClick={()=>edit(dashboard.id)}
      >
      <ModeEditIcon fontSize="inherit" />Edit
      </IconButton>

      <IconButton
      aria-label="copy" 
      size="small"
      onClick={()=>_remove(dashboard.id)}
      >
      <DeleteIcon fontSize="inherit" />Delete
      </IconButton>

      <hr/>
      </>
    )

}

