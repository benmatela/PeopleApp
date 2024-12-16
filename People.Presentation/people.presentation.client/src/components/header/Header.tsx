import { Container, Grid2 } from "@mui/material";
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
    <Container sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      boxShadow:
        "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      backgroundColor: "#e0f2fe",
      borderRadius: 2,
      marginBottom: 3
    }}>
      <Grid2 className="">
        <h1>{title}</h1>
        <h3>{subTitle}</h3>
      </Grid2>
    </Container>
  );
};
