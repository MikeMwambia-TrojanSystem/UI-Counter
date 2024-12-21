//Header component
import * as React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function HeaderComponent({offers,price}) {
  return (
    <>
      <AppBar color="primary">
        <Toolbar>
          <Box
            sx={{
              display:"grid",
              width:"100%",
              gridTemplateColumns:'repeat(3, 1fr)'
            }}>

          <Box sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              flexWrap: 'wrap'
            }}>
          <Typography
            variant="body2"
            component="p"
            sx={{
              mt: 0.5,
              color: 'inherit'
            }}>
          Ethereum marketplace<br/>{offers} open counters.
          </Typography>
          </Box>



          <Box sx={{ display: 'flex',justifyContent: 'flex-end',flexWrap: 'wrap'}}>

          <Typography
            variant="body2"
            component="p"
            sx={{
              mt: 0.5,
              color: 'inherit'
            }}>
          Price in dollars ($){price}<br/>Price source :- Binance.
          </Typography>

          </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}