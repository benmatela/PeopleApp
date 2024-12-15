import Grid2 from "@mui/material/Grid2";
import { BannerWithHeaderText } from "../../components/messaging/BannerWithHeaderText";

/**
 * Default page for unknown routes
 *
 * @returns {JSX.Element} component
 */
export const PageNotFound = () => {
  return (
    <Grid2>
      <BannerWithHeaderText
        text="Page Not found. Are you lost?"
        imageAlt="Page not found"
        minContainerHeight="70vh"
        mdScreenMaxWidth={450}
        mdScreenMaxHeight={367}
        bannerImageHeight={300}
        bannerImageWidth={400}
      />
    </Grid2>
  );
};
