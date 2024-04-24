//Copyright
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

function Copyright() {
  return (
    <>
      <Container>
        <Typography variant="body2" color="text.secondary" align="center">
          {" © "}
          <Link color="inherit" href="#">
            Mzynga Technology
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Container>
    </>
  );
}

export default Copyright;
