import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import HeaderComponent from "../components/header";
import StickyFooter from "../components/footer";
import MainDashboard from "../components/maindashboard";
import GradientCard from "../components/GradientCard";
import useSWR from "swr";
import { getData, getPrice } from "../lib/apiClient.js";

export default function Dashboard() {
  const { data: price } = useSWR("api/v3/ticker/price?symbol=ETHUSDT", getPrice, {
    refreshInterval: 10000,
  });
  const { data: dashboards } = useSWR(`dashboard/getactivedashboard`, getData);

  if (!dashboards || !price) {
    return (
      <Container component="main" maxWidth="sm" sx={{ mb: 2, pt: 8 }}>
        <GradientCard variant="green" sx={{ my: { xs: 3, md: 6 } }}>
          <Typography variant="body2" color="text.secondary">
            Fetching dashboards and price...
          </Typography>
        </GradientCard>
      </Container>
    );
  }

  if (dashboards.length === 0) {
    return (
      <>
        <HeaderComponent offers={dashboards.length} price={price.price} />
        <Container component="main" maxWidth="sm" sx={{ mb: 2, pt: 4 }}>
          <GradientCard variant="green" sx={{ my: { xs: 3, md: 6 } }}>
            <Typography variant="body2" color="text.secondary">
              There are no dashboards listed on this url yet. Check back later.
            </Typography>
          </GradientCard>
        </Container>
      </>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <HeaderComponent offers={dashboards.length} price={price.price} />
      <Container component="main" sx={{ mt: 4, mb: 2 }} maxWidth="lg">
        <GradientCard variant="blue" sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ mb: 1.5 }}>
            Welcome to counter
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 0.5 }}>
            A platform that gives you the freedom to price your crypto. You are running on
            Ethereum Sepolia TESTNET.
          </Typography>
          <Typography variant="body1" color="text.secondary">
            For up to Kshs 13 a day on a pay-per-use basis, you can have access to a configured
            account and trade over 50 currencies.
          </Typography>
        </GradientCard>

        <Box sx={{ display: "grid", gap: 3, gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" } }}>
          {dashboards.map((dashboard) => (
            <MainDashboard key={dashboard._id || dashboard.id} dashboard={dashboard} price={price} />
          ))}
        </Box>
      </Container>
      <Box component="footer" sx={{ py: 3, px: 2, mt: "auto" }}>
        <Container maxWidth="lg">
          <StickyFooter />
        </Container>
      </Box>
    </Box>
  );
}
