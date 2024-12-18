import { Box, Button, Grid2, Typography } from "@mui/material";
import { Navbar } from "../../components/layout/Navbar";
import PeopleProfilesImg from "../../assets/people_profiles.svg";
import { useNavigate } from "react-router-dom";

/**
 * The home page
 *
 * @returns
 */
export const Home = () => {
  // Page navigation
  const navigate = useNavigate();

  return (
    <Grid2 sx={{ minHeight: "100vh", backgroundColor: "#f9fafb", padding: 1 }}>
      <Navbar />
      <Grid2
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h3" sx={{ m: 3 }}>
          People Management
        </Typography>
        <Typography variant="h6" sx={{ m: 3 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing eli
        </Typography>
        <Button
          variant="contained"
          type="submit"
          sx={{ width: "190px", height: 55, m: 3 }}
          onClick={() => navigate("/people")}
        >
          Manage People
        </Button>
        <Box
          component="img"
          sx={{
            height: 400,
            width: 400,
            maxHeight: { xs: 233, md: "50vh" },
            maxWidth: { xs: 350, md: "50vh" },
          }}
          alt={"People"}
          src={PeopleProfilesImg}
        />
      </Grid2>
    </Grid2>
  );
};
