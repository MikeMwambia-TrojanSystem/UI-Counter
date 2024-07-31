import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';

export default function Phrase() {
	return (
	<Box sx={{ m: 1,textAlign:"center"}} >
      <form 
      // onSubmit={handleSubmit}
      >
        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        Your mnemonic phrase is :-
        </Typography>
        <Typography variant="body2" color="text.primary" sx={{ m: 1 }}>
        {/*{phrase}*/}
        </Typography>
        <label>
        <input type="checkbox" name="recovery"
        // checked={recovery} onChange={handleChange}
        />
          I understand that unique_link or it's developer
          cannot recover this phrase
        </label>
      </form>
      <div>
      <Button
          type="submit"
          // disabled={submitS()}
          // onClick={handleSubmit}
          size="small">
          Generate Address
        </Button>
      </div>
     </Box>
	)
}