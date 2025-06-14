/*
TODO :-
After deposit you should wait 15 minutes before
before trading is activated.
But show immeadiately on list page
QOS Bots
*/

import * as React from "react";
import { useRouter } from 'next/navigation';
import { useState } from "react";
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
import { getBalInEth_ } from "../pages/api/post/treasury.js";
import { priceInKshs,balInKshs } from "../pages/api/get/priceUtills.js";

export default function MainDashBoard({dashboard,price}) {

  const [kshs_price,setkshs_price] = useState(0);
  const [treasury_bal,setTreasury_bal] = useState(0);
  const [kshs_bal,setKshs_bal] = useState(0);
  const [minimum_buy_kshs,setMinimum_buy_kshs] = useState(0);
  const [maximum_buy_kshs,setMaximum_buy_kshs] = useState(0);
  const [byDisabled,setbyDisabled] = useState(true);
  const [buyInit,setbuyInit] = useState('Awaiting treasury funding');

  const priceDashboard = async (event) => {

  let Kshs_price = await priceInKshs(price.price,dashboard.dollar_rate);
  setkshs_price(Number(Kshs_price).toFixed(4));

  let treasuryBal = await getBalInEth_(dashboard.asset_treasury,'latest');
  setTreasury_bal(Number(treasuryBal).toFixed(4));

  let balInKshs_ = await balInKshs(Kshs_price,treasuryBal);
  setKshs_bal(Number(balInKshs_).toFixed(4));

  let minimum_buy_kshs_ = (Number(balInKshs_)>150)?(Number(dashboard.minimum_buy_kshs)):150;
  setMinimum_buy_kshs(Number(minimum_buy_kshs_).toFixed(4));

  let maximum_buy_kshs_ = (Number(150000)>Number(balInKshs_))?Number(balInKshs_):Number(150000);
  setMaximum_buy_kshs(Number(maximum_buy_kshs_).toFixed(4));

  if(Number(balInKshs_)>150){
    setbyDisabled(false);
    setbuyInit('Buy');
  }else{
    setbyDisabled(true);
    setbuyInit('Awaiting treasury funding');
  };

  };

  priceDashboard();

  const router = useRouter();

  const creationDate = new Date(dashboard.creationTime).toLocaleDateString() || null;
  const expiryTime = new Date(dashboard.expiryTime).toLocaleDateString() || null;

  const handleSubmit = async (event) => {

  event.preventDefault();

  const asset_treasury = dashboard.asset_treasury;

  router.replace({pathname:"/order",
    query:{
            "Kshs_price":kshs_price,
            "minimum_buy":minimum_buy_kshs,
            "maximum_buy_kshs":maximum_buy_kshs,
            "dashboardId":dashboard.id,
            "dollar_price":price.price,
            "dashboardname":dashboard.dashboardname,
            "dollar_rate":dashboard.dollar_rate,
            "asset_treasury":asset_treasury
          }});
  };

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start">
        <ListItemText
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Counter name :- {dashboard.dashboardname}.
                <br/>
                Dollar rate $1 = Kshs {dashboard.dollar_rate}.
                <br/>
                Price in Kshs {kshs_price}.
                <br/>
                Avialable is {treasury_bal} Ethereum.
                <br/>
                Valued at Kshs : - {kshs_bal}
                <br/>
                Max. buy is Kshs {maximum_buy_kshs}.
                <br/>
                Min. buy is Kshs {minimum_buy_kshs}.
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
                  disabled={byDisabled}
                  onClick={handleSubmit}
                  size="small">
                  {buyInit}
                </Button>
              </div>
              {/*
              Add this when bots go live
              <div sx={{ "& button": { m: 1 } }}>
             Successfull trades 789 trades , unsuccessfult trades 2.
              </div>*/}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li"/>
    </List>
  );
};