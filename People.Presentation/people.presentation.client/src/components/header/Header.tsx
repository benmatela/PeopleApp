import { Card, Grid2, Typography } from "@mui/material";
import "./styles.css";

/**
 * Header Props
 */
type HeaderProps = {
  title: string;
  subTitle: string;
};

/**
 * Top header component
 *
 * @param {HeaderProps} headerProps
 *
 * @returns {JSX.Element} component
 */
export const Header = ({ title, subTitle }: HeaderProps) => {
  return (
    <Card
    sx={{
      display: "grid",
      justifyContent: "center",
      alignItems: "center",
      boxShadow:
        "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      backgroundColor: "#f0f9ff",
      borderRadius: 2,
      marginBottom: 3,
    }}
  >
    <Grid2
      sx={{
        display: "grid",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: 2,
      }}
    >
      <Grid2>
        <Typography variant="h3">{title}</Typography>
      </Grid2>
      <Grid2>
        <Typography variant="h6">
          {subTitle}
        </Typography>
      </Grid2>
    </Grid2>
  </Card>
  );
};
