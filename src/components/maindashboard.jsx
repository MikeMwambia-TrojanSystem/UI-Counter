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
import { balInEth } from "../utils/addressUtills.js";
import useSWR from "swr";


export default function MainDashBoard({dashboard,price}) {

  console.log(dashboard);
    
  const router = useRouter();

  //TEST PURPOSES
  let { data, isLoading, isError }  = useSWR(`0x2442F0A5Bd476a64baa61641Bb9f5A0bb42EC875`,balInEth);


  let srcImage = null;
  let Kshs_price = null;

  if(dashboard.asset_id === "ETH"){
    srcImage = "/images/CoinIcons/eth.png";
  };


  if (isError) return <div>Failed to load refresh page...</div>;

  if (isLoading)
    return (
      <div>
        <LinearProgress color="inherit" />
      </div>
  );

  const dollar_price = Number(price.price);

  Kshs_price = Math.round(Number(dollar_price*dashboard.dollar_rate))

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
                Price is ${dollar_price} or Kshs {Kshs_price}.
                <br/>
                $1 = Kshs {dashboard.dollar_rate}.
                <br/>
                Max. buy per transaction is Kshs {dashboard.maximum_buy_kshs}.
                <br/>
                Min. buy per transaction is Kshs {dashboard.minimum_buy_kshs}.
                <br/>
                Avialable is {data} Ethereum.
              </Typography>
              <div sx={{ "& button": { m: 1 } }}>
             {/* Disabled/Active if the amnt of eth in wallet is greater 
              than equivalent in Kshs of minimum buy plug gas fee.*/}
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