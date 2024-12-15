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
        minHeight="100vh"
        mdScreenMaxWidth={450}
        mdScreenMaxHeight={367}
      />
    </Grid2>
  );
};
