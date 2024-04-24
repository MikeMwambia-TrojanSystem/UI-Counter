//Header component
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";

export default function OrderHeader(data) {

  const parsedInfo = data;

  return (
    <div>

      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Link href="/dashboard">
            <IconButton sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src={parsedInfo.data.profilePic} />
            </IconButton>
          </Link>
          <Typography variant="body2" sx={{ justifyContent: "center", ml: 2 }}>
            {parsedInfo.data.vendorName} <br />
            Assets listed :- 1
          </Typography>
          <Typography variant="body2" sx={{ justifyContent: "right",ml:'70%'}}>
            <a target="_blank" href="https://forms.gle/1rfPaW1AMDQkrkXK8" sx={{ justifyContent: "right" }} rel="noopener noreferrer">
            Request account
            </a>
            </Typography>
        </Toolbar>
      </AppBar>

    </div>
  );

}
