import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';

export default function Treasuryadd() {
	return (
	<Box sx={{ m: 1,textAlign:"center"}}> 
      <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
      Your Ethereum Treasury is :-  
      {/*{address}*/}
      </Typography>
      <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
      Your Private Key is :-  
      {/*{privKey} */}
      </Typography>
      <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
      KEEP THE PRIVATE KEY SAFE. 
      </Typography>
      <label>
        <input type="checkbox" 
        // name="recovery"
        // checked={recovery} 
        // onChange={handleChange}
        />
          I understand that unique_link or it's developer
          cannot recover the private key
      </label>
      <div>
      <Button>
        Set Treasury
      </Button>
      </div> 
      </Box>
	)
}