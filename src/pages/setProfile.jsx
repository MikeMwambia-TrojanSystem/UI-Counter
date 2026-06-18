import { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRouter } from 'next/navigation'
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import AppHeader from "../components/header";
import { createProfile }   from "./api/post/profile.js";

/* TODO :- 
  Restructure this code to allow the user to choose 
  the asset so the minimum amount 
  is set based on asset.
  Start with ETH and keep it @ Kshs 150
*/

const theme = createTheme();

export default function Profile(props) {

  const router = useRouter();

  const [ isDisabled , setDisabled ] = useState(false);

  const [ _min_buy , setMinimumBuyKshs ] = useState(150);

  const timestamp = Date.now().toString();

  const displayTime = new Date().toLocaleDateString();

  const handleSubmit = async (event) => {

    event.preventDefault()

    setDisabled(true);

    const data = {
      name: event.target.name.value,
      unique_link: event.target.unique_link.value,
      dollar_rate:Number(event.target.dollar_rate.value),
      minimum_buy_kshs:Number(_min_buy),
      paybill:Number(event.target.paybill.value),
      maximum_buy_kshs:Number(event.target.maximum_buy_kshs.value),
      status:false,
      r_t : timestamp
    };

    const response = await createProfile('createprofile',data);

    if(response === false){
      setDisabled(false);
      alert('Retry there was an erorr saving profile');
    }else{
      router.replace({pathname:"/setAsset",query:{x:response._id}},"/setAsset");
    }

  };

  const validateField = async(event) => {

    let price = document.getElementById("minimum_buy_kshs").value||0;

    let _min_buyC = (Number(price)>Number(150000))?Number(150000):(Number(149)>Number(price))?Number(149):Number(price);
    setMinimumBuyKshs(_min_buyC);

  }

  return (
     <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Container component="main" maxWidth="sm" sx={{ mb: 2 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>   

      <Box sx={{ m: 1,textAlign:"center" }}>

      <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
          Create dashboard profile
      </Typography>

      <form onSubmit={handleSubmit}>

        <TextField
          required
          id="name"
          name="name"
          fullWidth
          type="string"
          variant="standard"
          InputProps={{
            startAdornment: (
              <InputAdornment position="end" sx={{ m: 1 }}>
                Name.{" "}
              </InputAdornment>
            ),
          }}
        />
   
        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
          Paybill number
        </Typography>
        <TextField
          required
          id="paybill"
          name="paybill"
          fullWidth
          type="number"
          variant="standard"
          defaultValue={props.paybill}
          InputProps={{
            readOnly: true,
            startAdornment: (
              <InputAdornment position="end" sx={{ m: 1 }}>
                No.{" "}
              </InputAdornment>
            ),
          }}
        />

        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Unique link
        </Typography>
        <TextField
            required
            id="unique_link"
            name="unique_link"
            fullWidth
            type="string"
            variant="standard"
            defaultValue={props.unique_link}
            InputProps={{
              readOnly:true,
              startAdornment: (
                <InputAdornment position="end" sx={{ m: 1 }}>
                  Link.{" "}
                </InputAdornment>
              ),
            }}
          />

        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Timestamp
        </Typography>
        <TextField
            required
            id="timestamp"
            name="timestamp"
            fullWidth
            type="string"
            variant="standard"
            defaultValue={displayTime}
            InputProps={{
              readOnly:true,
              startAdornment: (
                <InputAdornment position="end" sx={{ m: 1 }}>
                  Created.{" "}
                </InputAdornment>
              ),
            }}
          />

        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Maximum buy amount
        </Typography>
        <TextField
            required
            id="maximum_buy_kshs"
            name="maximum_buy_kshs"
            fullWidth
            type="number"
            variant="standard"
            defaultValue={props.maximum_buy_kshs}
            InputProps={{
              readOnly:true,
              startAdornment: (
                <InputAdornment position="end" sx={{ m: 1 }}>
                  Kshs.{" "}
                </InputAdornment>
              ),
            }}
          />



        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Minimum buy amount
        </Typography>
        <TextField
            required
            id="minimum_buy_kshs"
            name="minimum_buy_kshs"
            fullWidth
            type="number"
            variant="standard"
            defaultValue={_min_buy}
            InputProps={{
              startAdornment: (
                <InputAdornment position="end" sx={{ m: 1 }}>
                  Kshs.{" "}
                </InputAdornment>
              ),
            }}
            helperText="Default is Kshs 150"
            onChange={validateField}
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
          InputProps={{
            startAdornment: (
              <InputAdornment position="end" sx={{ m: 1 }}>
                Rate.{" "}
              </InputAdornment>
            ),
          }}
        />

        <div sx={{ "& button": { m: 2 } }}>
          <Button
            type="submit"
            size="small"
            disabled={isDisabled}>
            Submit
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

  const paybill = process.env.PAYBILL || null;

  const unique_link = process.env.UNIQUE_URL || null; 

  const maximum_buy_kshs = "150000";

  return {
    props: {
      maximum_buy_kshs: maximum_buy_kshs,
      unique_link: unique_link,
      paybill:paybill
    },
  };
  
}