import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";

/** The small floating rounded-square icon buttons in a GradientCard's corners. */
const CardNavButton = styled(IconButton)(() => ({
  width: 40,
  height: 40,
  borderRadius: 14,
  backgroundColor: "rgba(0,0,0,0.55)",
  color: "#fff",
  "&:hover": { backgroundColor: "rgba(0,0,0,0.75)" },
}));

export default CardNavButton;
