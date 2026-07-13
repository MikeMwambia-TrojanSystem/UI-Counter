import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

/**
 * The dark, glowing, rounded card used across hero / feature screens.
 * variant="green" glows blue top-left / green bottom-right (and the
 * opposite for variant="blue"), matching the two-card hero pattern.
 */
const GradientCard = styled(Box, {
  shouldForwardProp: (prop) => prop !== "variant",
})(({ variant = "green" }) => ({
  position: "relative",
  borderRadius: 32,
  padding: "32px 28px",
  overflow: "hidden",
  backgroundColor: "#0D0F12",
  border: "1px solid rgba(255,255,255,0.08)",
  backgroundImage:
    variant === "green"
      ? "radial-gradient(120% 100% at 0% 0%, rgba(59,130,246,0.32) 0%, transparent 45%)," +
        "radial-gradient(120% 100% at 100% 100%, rgba(34,197,94,0.42) 0%, transparent 50%)"
      : "radial-gradient(120% 100% at 0% 0%, rgba(34,197,94,0.38) 0%, transparent 45%)," +
        "radial-gradient(120% 100% at 100% 100%, rgba(59,130,246,0.42) 0%, transparent 50%)",
}));

export default GradientCard;
