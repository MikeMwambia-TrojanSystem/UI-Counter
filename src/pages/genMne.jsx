import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import AppHeader from "../components/header";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import { useState } from "react";
import { getMnemonic } from "../pages/api/get/addressUtils.js";
import { genAddress }  from "../pages/api/post/mnemonic.js";
import { useRouter,useSearchParams } from 'next/navigation';

const theme = createTheme();

export default function GenMnemonic(props) {

  const router = useRouter();
  const searchParams = useSearchParams();


  //Gen mnemonic phrase
  const [status, setStatus] = useState(false);
  const [displayMne, setdisplayMne] = useState('block');

  //Men Phrase
  const [phrase,setPhrase] = useState(null);

  //Sub mnemonic phrase
  const [subStatus, setsubStatus] = useState(false);
  const [disSubmitA, setdisSubmitA] = useState(true);
  const [dissubStatus, setdissubStatus] = useState('none');

  //Address Gen Template
  const [disAddress,setdisAddress] = useState('none');
  const [address,setaddress] = useState(null);
  const [private_key,setprivate_key] = useState(null);

  const generateMnemonic = async (event) => {

      const wrdList = await getMnemonic();

      if(false===wrdList) return alert('Error refresh page and retry'); 
      setStatus(true);
      setdisplayMne('none');
      setPhrase(wrdList);
      setdissubStatus('block');

  };

  //Submit Mnem Status

  const handleSubmit = async (event) => {

    event.preventDefault();

    if(subStatus && phrase) {

    const response = await genAddress('getAddress',{phrase:phrase});

    if(false === response) return alert("Error occured refresh page and retry");

    let addType = typeof response._address.address;
    let keyType = typeof response._key;

    if(addType === 'string' && keyType === 'string') {

      setaddress(response._address.address);
      setprivate_key(response._key);
      setdisAddress('block');
      setdisSubmitA(true);

    } else {

      return alert("Error generating wallet");

    };

  };

};

  const handleChange = (event) => {

    if(event.target.name==='subStatus'){
      setsubStatus(event.target.checked);
    };

    if(event.target.checked && (null != phrase)
      &&(null == address) && (null ==private_key)){
      setdisSubmitA(false);
    }else{
      setdisSubmitA(true);
    };

  };



  const saveAddress = async (event) => {

    event.preventDefault();

    if(address && phrase && private_key){

      const id = searchParams.get('x');

      router.replace({
        pathname:"/setTreasury",
        query:{
          x:id,
          a:address
        }},
        "/setTreasury");
      
    } else {

      alert('Error refresh page and try');

    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppHeader/>
      <Container component="main" maxWidth="sm" sx={{ mb: 2 }}>
      <Paper variant="outlined" 
      sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}> 

    <Box sx={{ m: 1,textAlign:"center"}}>

      <Box sx={{ display: displayMne }}>

        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        To generate a wallet you will need to generate a mnemonic phrase which 
        form the foundation of your wallet keep this phrase
        safe,whoever knows this phrase has control of your treasury wallet. 
        </Typography>
        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        KEEP THE PHRASE SAFE. 
        </Typography>
        <Button
          type="submit"
          onClick={generateMnemonic}
          disabled={status}
          size="small">
          Generate Mnemonic Phrase
        </Button>

      </Box> 

      <Box sx={{ display: dissubStatus }}>
        <form onSubmit={handleSubmit}>
          <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
          Your mnemonic phrase is :-
          </Typography>
          <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
          {phrase}
          </Typography>
          <label>
          <input type="checkbox" name="subStatus"
          checked={subStatus} onChange={handleChange}/>
            I understand that {props.unique_link}.counter.co.ke or it's developer
            cannot recover this phrase
          </label>
        </form>
        <Button
            type="submit"
            disabled={disSubmitA}
            onClick={handleSubmit}
            size="small">
            Generate Address
          </Button>
      </Box>

      <Box sx={{ display: disAddress }}>
      {/*Put address in url and to redirect /setTreasury page*/}
      <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
       Your Ethereum treasury address is : - 
      </Typography>
      <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
       {address} 
      </Typography>
      <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
      Your private key is : -
      </Typography>
      <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
      {private_key}
      </Typography>
      <Button
          type="submit"
          onClick={saveAddress}
          size="small">
          Save Address
        </Button>
      </Box>

    </Box>

      </Paper>
      </Container>
    </ThemeProvider> 
  );
}



export async function getStaticProps() {

  const unique_link = process.env.UNIQUE_URL || null; 

  return {
    props: {
      unique_link: unique_link
    },
  };
  
}