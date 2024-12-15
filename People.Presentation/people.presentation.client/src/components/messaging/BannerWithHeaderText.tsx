import Grid2 from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import EmptyPersonImg from "../../assets/empty_people.svg";

interface NotFoundBannerProps {
  text: string;
  imageAlt: string;
  minHeight: string;
  mdScreenMaxHeight: number;
  mdScreenMaxWidth: number;
}

/**
 * Default banner with text at the top
 *
 * @returns {JSX.Element} component
 */
export const BannerWithHeaderText = ({
  text,
  imageAlt,
  minHeight,
  mdScreenMaxHeight,
  mdScreenMaxWidth,
}: NotFoundBannerProps) => {
  return (
    <Grid2
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: minHeight }}
    >
      <h2>{text}</h2>
      <Grid2>
        <Box
          component="img"
          sx={{
            height: 233,
            width: 350,
            maxHeight: { xs: 233, md: mdScreenMaxHeight },
            maxWidth: { xs: 350, md: mdScreenMaxWidth },
          }}
          alt={imageAlt}
          src={EmptyPersonImg}
        />
      </Grid2>
    </Grid2>
  );
};
