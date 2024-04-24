import * as React from "react";
import { useRouter } from 'next/navigation';
import coinNameF from "../utils/coinName.js";
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
import { getData } from "../pages/api/get/getData.js";
import useSWR from "swr";

function ListComponent({dashboard}) {

  //Calcuate expiry time readable
  //Clean up code
  //Push to github
  const router = useRouter();

  //Make this method pull price every 5 secs
  let { data, isLoading, isError }  = useSWR(`getasset?_id=${dashboard.asset_id}`,getData);

  let srcImage = null;
  let Kshs_price = null;

  if(dashboard.asset_id === "BNB"){
    srcImage = "/images/CoinIcons/BNB.png";
  };

  if(dashboard.asset_id === "ETH"){
    srcImage = "/images/CoinIcons/eth.png";
  };

  if(dashboard.asset_id === "MATIC"){
    srcImage = "/images/CoinIcons/Matic.png";
  };

  if(dashboard.asset_id === "POKT"){
    srcImage = "/images/CoinIcons/black-logo.png";
  };

  if (isError) return <div>Failed to load refresh page...</div>;

  if (!data)
    return (
      <div>
        <LinearProgress color="inherit" />
      </div>
  );

  Kshs_price = data.dollar_price*dashboard.dollar_rate;

  const handleSubmit = async (event) => {

  event.preventDefault();

  router.replace({pathname:"/order",
    query:{"dollar_rate":dashboard.dollar_rate,
           "dollar_price":data.dollar_price,
           "asset_type":dashboard.asset_id
          }});
  };

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={srcImage}/>
        </ListItemAvatar>
        <ListItemText
          primary={dashboard.asset_id}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Price is ${data.dollar_price} or Kshs {Kshs_price}.
                <br/>
                $1 = Kshs {dashboard.dollar_rate}.
                <br/>
                Max. buy is Kshs {dashboard.maximum_buy_kshs}.
                <br/>
                  {
                  /*
                  This is determined by treasury balance * dollar rate * asset price 
                  must be capped to 150K kazi ya bots updated every 1 sec
                  */
                  }
                Min. buy is Kshs {dashboard.minimum_buy_kshs}.
              </Typography>
              <div sx={{ "& button": { m: 1 } }}>
                <Button
                  prefetch={false}
                  replace={true}
                  onClick={handleSubmit}
                  size="small">
                  Lock Order
                </Button>
              </div>
              Last price update :- {data.r_t}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li"/>
    </List>
  );
}


export default function MainDashBoard(data) {

  const dashboards_ = data["data"];

  return (
    <>
      <React.Fragment>
        {dashboards_.map((dashboard) => {
              return (<ListComponent dashboard={dashboard}/>);
        })}
      </React.Fragment>
    </>
  );
}
