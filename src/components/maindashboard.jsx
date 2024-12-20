import * as React from "react";
import { useRouter } from 'next/navigation';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import LinearProgress from "@mui/material/LinearProgress";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';


export default function MainDashBoard({dashboard}) {

  const router = useRouter();

  const creationDate = new Date(dashboard.creationTime).toLocaleDateString() || null;
  const expiryTime = new Date(dashboard.expiryTime).toLocaleDateString() || null;

  const handleSubmit = async (event) => {

  event.preventDefault();

  alert('This part is not ready for testing');

  /*router.replace({pathname:"/order",
    query:{"dollar_rate":dashboard.dollar_rate,
           "dollar_price":dollar_price,
           "asset_type":dashboard.asset_id,
           "order_treasury":dashboard.asset_treasury,
           "minimum_buy":dashboard.minimum_buy_kshs
          }});*/
  };

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/images/CoinIcons/eth.png"/>
        </ListItemAvatar>
        <ListItemText
          primary="Ethereum"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Name is {dashboard.dashboardname}.
                <br/>
                Price in $ {dashboard.dollar_price}.
                <br/>
                Price in Kshs {dashboard.Kshs_price}.
                <br/>
                $1 = Kshs {dashboard.dollar_rate}.
                <br/>
                Max. buy is Kshs {dashboard.maximum_buy_kshs}.
                <br/>
                Min. buy is Kshs {dashboard.minimum_buy_kshs}.
                <br/>
                Avialable is {dashboard.asset_treasury} Ethereum.
                <br/>
                Valued at : - {dashboard.available}
                <br/>
                Creation time : - {creationDate}
                <br/>
                Expiry time : -  {expiryTime}
              </Typography>
              <div sx={{ "& button": { m: 1 } }}>
             {/* Disable if valued at value is less than Kshs 150*/}
                <Button
                  prefetch={false}
                  replace={true}
                  onClick={handleSubmit}
                  size="small">
                  Buy
                </Button>
              </div>
              Refresh Interval :- 5 secs
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li"/>
    </List>
  );
};