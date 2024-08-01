import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import AppHeader from "../components/header";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

// Replaces the setDashboard page
// Still keeps the edit dashboard workflow
// The workflow for the creation of dashboards
// is improves with this new small info based components
// that cumulatively create a dashboard

const theme = createTheme();


export default function DashboardInfo() {
	return (

<ThemeProvider theme={theme}>
      <CssBaseline />
      <AppHeader/>
      <Container component="main" maxWidth="sm" sx={{ mb: 2 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>      
      <Box sx={{ m: 1,textAlign:"center" }}>
      <form>
      <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
          Confirm Dashboard Information
      </Typography>

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
          defaultValue="4107329"
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
        Treasury Address
        </Typography>
        <TextField
            required
            id="treasury"
            name="treasury"
            fullWidth
            type="string"
            variant="standard"
            defaultValue="0x25768b56668eb0aD27Af1B3e92c5a864e2fF2c1e"
            InputProps={{
              readOnly:true,
              startAdornment: (
                <InputAdornment position="end" sx={{ m: 1 }}>
                  Eth.{" "}
                </InputAdornment>
              ),
            }}
          />

        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Asset withdrawal address
        </Typography>
        <TextField
            required
            id="with_address"
            name="with_address"
            fullWidth
            type="string"
            variant="standard"
            defaultValue="0x25768b56668eb0aD27Af1B3e92c5a864e2fF2c1e"
            InputProps={{
              readOnly:true,
              startAdornment: (
                <InputAdornment position="end" sx={{ m: 1 }}>
                  Address.{" "}
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
            defaultValue="150000"
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
            // This is the dollar rate
            defaultValue="150"
            InputProps={{
              startAdornment: (
                <InputAdornment position="end" sx={{ m: 1 }}>
                  Kshs.{" "}
                </InputAdornment>
              ),
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
          InputProps={{
            startAdornment: (
              <InputAdornment position="end" sx={{ m: 1 }}>
                $.{" "}
              </InputAdornment>
            ),
          }}
        />
        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Current price in dollars : - 2500
        </Typography>

        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Update frequency : - 5 Seconds
        </Typography>

        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Price oracle : - Coin gecko
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
            size="small">
            Publish
          </Button>
          <Button
            type="submit"
            size="small">
            Delete
          </Button>
        </div>

      </form>
      </Box>
        </Paper>
      </Container>
    </ThemeProvider>
	)
}