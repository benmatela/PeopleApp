import Grid2 from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import EmptyPersonImg from "../../../assets/empty_people.svg";
import { Typography } from "@mui/material";

interface NotFoundBannerProps {
  text: string;
  imageAlt: string;
  bannerImageHeight: number;
  bannerImageWidth: number;
  minContainerHeight: string;
  mdScreenMaxHeight: number;
  mdScreenMaxWidth: number;
}

/**
 * Default banner with with a message
 *
 * @returns {JSX.Element} component
 */
export const BannerWithHeaderText = ({
  text,
  imageAlt,
  bannerImageHeight,
  minContainerHeight,
  bannerImageWidth,
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
      sx={{ minHeight: minContainerHeight }}
    >
      <Typography variant="h5" sx={{ padding: 2 }}>{text}</Typography>
      <Grid2>
        <Box
          component="img"
          sx={{
            height: bannerImageHeight,
            width: bannerImageWidth,
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
