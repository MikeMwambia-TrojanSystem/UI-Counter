import { useState } from "react";
import { useRouter } from 'next/navigation'
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import AppHeader from "../components/header";
import { useSearchParams } from 'next/navigation'
import { getMnemonic } from "./api/get/getData.js";
import { genAddress }  from "./api/post/mnemonic.js";

const theme = createTheme();

export default function Treasury(props) {

  const router = useRouter();

  //Activate or deactivate depending on this state
  const [status, setStatus] = useState(false);
  const [phrase, setPhrase] = useState(null);
  const [recovery,isRecovery] = useState(false);

  const handleSubmit = async (event) => {

    event.preventDefault();

    if(recovery){

      if(null ===phrase){
        alert('Generate mnemonic');
      }

      const data = { phrase };

      const response = await genAddress('generateAddress',data);

      console.log(response);
    }

    alert('Accept terms and conditions');

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
      </Paper>
      </Container>
    </ThemeProvider>
  );
}
