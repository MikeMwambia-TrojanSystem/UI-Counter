import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AppHeader from "../components/header";
import Container from "@mui/material/Container";

const theme = createTheme();

export default function _Intro(props) {

  const unique_link = 'Confirm URL is https://'+props.unique_link+'.counter.co.ke';
  const _assets = props._assets;

//Add foundation layout

  return (
      <ThemeProvider theme={theme}>
      <CssBaseline/>
      <AppHeader/>
      <Container component="main" maxWidth="sm" sx={{ mb: 2 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>      
      <Box sx={{ m: 1,textAlign:"center" }}>
      <div>
        <Typography variant="body2" sx={{ justifyContent: "center", m: 1 }}>
          Welcome to counter OTC desk Test 1
        </Typography>
        <Typography variant="body2" sx={{ justifyContent: "center", m: 1 }}>
          { unique_link }.
        </Typography>
         <Typography variant="body2" sx={{ justifyContent: "center", m: 1 }}>
          The assets supported are :-
        </Typography>
        {_assets.map((asset) => {
              return (
                <Typography variant="body2" sx={{ justifyContent: "center", m: 1 }}>
                 {asset}
                </Typography>
              );
            })}
        <Typography variant="body2" sx={{ justifyContent: "center", m: 1 }}>
          Total Kenya Shillings volume per day configured is {props.amountKshs} on this desk.
        </Typography>
         <Typography variant="body2" sx={{ justifyContent: "center", m: 1 }}>
          By continuing you agree to the above configurations.
        </Typography>
      </div>
      <div sx={{ "& button": { m: 1 } }}>
        <Button
          href="/termsandcondtions"
          prefetch={false}
          replace={true}
          size="small">
          Continue
        </Button>
      </div>
      </Box>
      </Paper>
      </Container>
    </ThemeProvider>
    );
};


export async function getStaticProps() {

  const unique_link = process.env.UNIQUE_URL || null; 

  const amountKshs = parseInt(150000);

  const _assets = ["Ethereum Token on Ethereum Network"];

  return {
    props: {
      _assets: _assets,
      amountKshs: amountKshs,
      unique_link: unique_link
    },
  };
  
}