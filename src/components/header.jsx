//Header component
import * as React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function HeaderComponent({vendors}) {
  let vendorsListed = vendors;
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
          Digital Assets Market
          </Typography>
          </Box>



          <Box sx={{ display: 'flex',justifyContent: 'flex-end',flexWrap: 'wrap'}}>

          <Typography
            variant="body2"
            component="a"
            href="https://forms.gle/1rfPaW1AMDQkrkXK8"
            sx={{
              mt: 0.5,
              fontFamily: 'monospace',
              fontWeight: 200,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
          Create account
          <br/>
          Settings
          </Typography>

          </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
