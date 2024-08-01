import { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import AppHeader from "../components/header";
import {createAsset}  from "./api/post/asset.js";
import { useRouter,useSearchParams } from 'next/navigation';
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";


// The getting dollar price logic has been moved to
// couch DB service and at this stage of asset creation
// the price will be set to the default 0
// the status will be set to the default false
// If on couch service the bots pick up the asset and update
// the price from picking in coingecko the status updates to true
// The status is a field on the asset that is used to know whether the asset
// is updating
//NB:- This function does not need an update on front or backend/couch service

// Consider running this after
// running the generate treasury workflow
// this will give us the opportunity to have
// treasury parameter
// The confirm button is to update the dashboard
// So it's Profile - Treasury gen - asset creation - dashabord creation 
// All while updating the dahsboard

const theme = createTheme();

export default function AssetInfo() {

  // const [ isDisabled , setDisabled ] = useState(true);

  // const router = useRouter();

  // const searchParams = useSearchParams();

  // const id = searchParams.get('x');

  // const timestamp = searchParams.get('y');

  // const handleChange = (event) => {
  //   setDisabled(false);
  // };

  // const handleSubmit = async (event) => {

  //   setDisabled(true);

  //   event.preventDefault()

  //   const selectedV = document.querySelector("input[type='radio'][name=support_crypto]:checked").value;

  //   const data = {
  //     _id:selectedV,
  //     status:false,
  //     dollar_price:Number(0),
  //     min_buy_dollar:Number(1),
  //     r_t:Number(timestamp)
  //   };

  //   const response = await createAsset('assets',data);

  //   if(response === false){
  //     setDisabled(false);
  //     alert('Error refresh page and try again or try a different asset');
  //   }else{
  //     //router.replace({pathname:"/setTreasury",query:{x:id,y:selectedV,z:timestamp}},"/setTreasury");
  //     router.replace({pathname:"/genMne",query:{x:id,y:selectedV,z:timestamp}},"/genMne");
  //   }

  // };

  return (
     <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppHeader/>
      <Container component="main" maxWidth="sm" sx={{ mb: 2 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>      
      <Box sx={{ m: 1,textAlign:"center" }}>
      <form >
      <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Asset Information
      </Typography>

      <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
          Name
        </Typography>
        <TextField
          required
          id="asset_name"
          name="asset_name"
          fullWidth
          type="string"
          variant="standard"
          defaultValue="Ethereum"
          InputProps={{
            readOnly: true,
            startAdornment: (
              <InputAdornment position="end" sx={{ m: 1 }}>
                ETH {" "}
              </InputAdornment>
            ),
          }}
        />

        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
          Treasury
        </Typography>
        <TextField
          required
          id="asset_treasury"
          name="asset_treasury"
          fullWidth
          type="string"
          variant="standard"
          defaultValue="0xb083BF33c30DC521F4d59AfCd980322599D29Bc5"
          InputProps={{
            readOnly: true,
            startAdornment: (
              <InputAdornment position="end" sx={{ m: 1 }}>
                ETH {" "}
              </InputAdornment>
            ),
          }}
        />

        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
          Dollar Price
        </Typography>
        <TextField
          required
          id="price"
          name="price"
          fullWidth
          type="number"
          variant="standard"
          defaultValue="0"
          InputProps={{
            readOnly: true,
            startAdornment: (
              <InputAdornment position="end" sx={{ m: 1 }}>
                $.{" "}
              </InputAdornment>
            ),
          }}
        />

        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        <Button
          type="submit"
          size="small">
          Update Price
        </Button>
        </Typography>

        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
          Minimum asset possible to buy
        </Typography>
        <TextField
          required
          id="minimum_buy"
          name="minimum_buy"
          fullWidth
          type="string"
          variant="standard"
          defaultValue="0.0000"
          InputProps={{
            readOnly: true,
            startAdornment: (
              <InputAdornment position="end" sx={{ m: 1 }}>
                ETH.{" "}
              </InputAdornment>
            ),
          }}
        />

        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Related profile information :-
        </Typography>

        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Minimum buy with Kshs
        </Typography>
        <TextField
          required
          id="minimum_buy_kshs"
          name="minimum_buy_kshs"
          fullWidth
          type="string"
          variant="standard"
          defaultValue="150"
          InputProps={{
            readOnly: true,
            startAdornment: (
              <InputAdornment position="end" sx={{ m: 1 }}>
                KSH.{" "}
              </InputAdornment>
            ),
          }}
        />

      <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Dollar to Kshs rate :- 145
      </Typography>
      <TextField
          required
          id="$_to_Kshs"
          name="$_to_Kshs"
          fullWidth
          type="string"
          variant="standard"
          defaultValue="150"
          InputProps={{
            readOnly: true,
            startAdornment: (
              <InputAdornment position="end" sx={{ m: 1 }}>
                $ - Kshs.{" "}
              </InputAdornment>
            ),
          }}
        />
      <div sx={{ "& button": { m: 2 } }}>
      <Button type="submit" size="small">
        Save treasury
      </Button>
      <Button type="submit" size="small">
        Delete
      </Button>
      </div>
      </form>
      </Box>
      </Paper>
      </Container>
    </ThemeProvider>
  );
}
