import Grid2 from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import EmptyPersonImg from "../../assets/empty_people.svg";

/**
 * Default page for unknown routes
 *
 * @returns {JSX.Element} component
 */
export const PageNotFound = () => {
  return (
    <Grid2
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh" }}
    >
      <h2>Page Not found. Are you lost?</h2>
      <Grid2>
        <Box
          component="img"
          sx={{
            height: 233,
            width: 350,
            maxHeight: { xs: 233, md: 367 },
            maxWidth: { xs: 350, md: 450 },
          }}
          alt="People not found."
          src={EmptyPersonImg}
        />
      </Grid2>
    </Grid2>
  );
};
