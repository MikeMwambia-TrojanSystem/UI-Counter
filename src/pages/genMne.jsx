import { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import AppHeader from "../components/header";
import { getMnemonic } from "./api/get/getData.js";
import { genAddress }  from "./api/post/mnemonic.js";
import { useRouter,useSearchParams } from 'next/navigation';

const theme = createTheme();

export default function Treasury(props) {

  const router = useRouter();
  const searchParams = useSearchParams();

  //Get params from URL
  const id = searchParams.get('x');
  const asset_id = searchParams.get('y');
  const timestamp = searchParams.get('z');

  //Activate or deactivate depending on this state
  const [status, setStatus] = useState(false);
  const [phrase, setPhrase] = useState(null);
  const [recovery,isRecovery] = useState(false);

  //Address and Private_Key
  const [address,setAddress] = useState(null);
  const [privKey,setPrivKey] = useState(null);

  const handleSubmit = async (event) => {

    event.preventDefault();

    if(recovery){

      if(null ===phrase){
        alert('Generate mnemonic phrase');
      }

      const data = { phrase };

      const response = await genAddress('getAddress',data);

      setAddress(response._address.address);
      setPrivKey(response._key);

      console.log(response);

    }

    alert('Generate mnemonic phrase');

  };

  const generateMnemonic = async (event) => {

      const wrdList = await getMnemonic();
      setPhrase(wrdList);
      setStatus(true);
  };

  const handleChange = (event) => {

    if(event.target.name==='recovery'){
      isRecovery(event.target.checked);
    };

  };

  const submitS = ()=>{

    if(recovery && (null != phrase)){
      return false;
    }
    return true;

  }

  return (
     <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppHeader/>

      <Container component="main" maxWidth="sm" sx={{ mb: 2 }}>
      <Paper variant="outlined" 
      sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}> 
      <Box sx={{ m: 1,textAlign:"center"}}> 
      <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
      To generate a wallet you will need to generate a mnemonic phrase which 
      form the foundation of your wallet keep this phrase
      safe,whoever knows this phrase has control of your treasury wallet. 
      </Typography>
      <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
      KEEP THE PHRASE SAFE. 
      </Typography>
      <div>
      <Button
        type="submit"
        onClick={generateMnemonic}
        disabled={status}
        size="small">
        Generate Mnemonic Phrase
      </Button>
      </div> 
      </Box>   
      <Box sx={{ m: 1,textAlign:"center"}} >
      <form onSubmit={handleSubmit}>
        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Your mnemonic phrase is :-
        </Typography>
        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        {phrase}
        </Typography>
        <label>
        <input type="checkbox" name="recovery"
        checked={recovery} onChange={handleChange}/>
          I understand that mzynga.com or it's developer
          cannot recover this phrase
        </label>
      </form>
      <div>
      <Button
          type="submit"
          disabled={submitS()}
          onClick={handleSubmit}
          size="small">
          Generate Address
        </Button>
      </div>
      </Box>
      <Box sx={{ m: 1,textAlign:"center"}}> 
      <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
      Your Ethereum Treasury is :-  {address}
      </Typography>
      <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
      Your Private Key is :-  {privKey} 
      </Typography>
      <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
      KEEP THE PRIVATE KEY SAFE. 
      </Typography>
      <label>
        <input type="checkbox" name="recovery"
        checked={recovery} onChange={handleChange}/>
          I understand that mzynga.com or it's developer
          cannot recover the private key
      </label>
      <div>
      <Button>
        Set Treasury
      </Button>
      </div> 
      </Box>
      </Paper>
      </Container>
    </ThemeProvider>
  );
}
