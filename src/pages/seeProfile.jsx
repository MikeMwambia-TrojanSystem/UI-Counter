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

// Consider dropiing the unique link 
// untill after prod of current version

const theme = createTheme();


export default function ProfileInfo() {
	return (

<ThemeProvider theme={theme}>
      <CssBaseline />
      <AppHeader/>
      <Container component="main" maxWidth="sm" sx={{ mb: 2 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>      
      <Box sx={{ m: 1,textAlign:"center" }}>
      <form>
      <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
          Confirm Profile information
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
        Unique link
        </Typography>
        <TextField
            required
            id="unique_link"
            name="unique_link"
            fullWidth
            type="string"
            variant="standard"
            defaultValue="kanyumbani.com"
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
            defaultValue="1722411074177"
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

        <div sx={{ "& button": { m: 2 } }}>
          <Button
            type="submit"
            size="small">
            Confirm
          </Button>
          <Button
            type="submit"
            size="small">
            Edit
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