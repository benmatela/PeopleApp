import { Grid2 } from "@mui/material";
import { Navbar } from "../../components/layout/Navbar";

export const Home = () => {
  return (
    <Grid2 sx={{ minHeight: "100vh", backgroundColor: "#f9fafb", padding: 1 }}>
      <Navbar />
    </Grid2>
  );
};
