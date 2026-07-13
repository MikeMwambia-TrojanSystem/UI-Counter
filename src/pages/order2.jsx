import { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { useRouter, useSearchParams } from "next/navigation";
import { updateOrder } from "./api/post/order.js";
import { isAddressValid } from "./api/post/treasury.js";
import { getBalInEth_ } from "../pages/api/post/treasury.js";
import GradientCard from "../components/GradientCard";
import CardNavButton from "../components/CardNavButton";

// NOTE: this is a styling-only pass. The "treasury balance covers this
// order" check below is still client-side only -- that's a functional/
// security fix tracked separately (see Suggested_Code_Fixes.pdf, item 11),
// not something this theme script changes.
export default function Order2() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const order_id = searchParams.get("x");
  const asset_treasury = searchParams.get("o");
  const cryptoValue = searchParams.get("y");

  const [status, setStatus] = useState(true);

  const _isAddress = async () => {
    try {
      const crypto_address = document.getElementById("crypto_address").value || null;
      const valid = await isAddressValid(crypto_address);
      setStatus(!valid);
    } catch (err) {
      return false;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const crypto_address = document.getElementById("crypto_address").value || null;
    const isAddressS = await isAddressValid(crypto_address);
    const treasuryAmnt = await getBalInEth_(asset_treasury, "safe");

    if (treasuryAmnt > cryptoValue) {
      if (isAddressS) {
        const data = { _id: order_id, crypto_address: crypto_address, form: "order_2" };
        const response = await updateOrder("updateorder", data);
        if (response === false) {
          alert("Error refresh page and try again");
        } else {
          router.replace({ pathname: "/order3", query: { x: response } });
        }
      } else {
        alert("Not a valid address");
      }
    } else {
      alert("Treasury amount could not support order");
      router.replace({ pathname: "/dashboard" });
    }
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 2, pt: 8 }}>
      <GradientCard variant="blue" sx={{ my: { xs: 3, md: 6 } }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <CardNavButton onClick={() => router.back()} aria-label="back">
            &#8249;
          </CardNavButton>
          <CardNavButton aria-label="open">&#8599;</CardNavButton>
        </Box>

        <Typography variant="h4" sx={{ mb: 3 }}>
          Receiving Address
        </Typography>

        <form onSubmit={handleSubmit}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
            Enter the crypto address that will receive the ethereum:
          </Typography>
          <TextField
            required
            id="crypto_address"
            name="crypto_address"
            fullWidth
            type="text"
            onChange={_isAddress}
            sx={{ mb: 3 }}
          />
          <Button variant="contained" color="primary" disabled={status} type="submit" fullWidth>
            Validate Order
          </Button>
        </form>
      </GradientCard>
    </Container>
  );
}
