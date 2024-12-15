import { BannerWithHeaderText } from "../../components/messaging/banner-with-header-text/BannerWithHeaderText";

/**
 * Default page for unknown routes
 *
 * @returns {JSX.Element} component
 */
export const PageNotFound = () => {
  return (
    <BannerWithHeaderText
      text="Page Not found. Are you lost?"
      imageAlt="Page not found"
      minContainerHeight="70vh"
      mdScreenMaxWidth={450}
      mdScreenMaxHeight={367}
      bannerImageHeight={300}
      bannerImageWidth={400}
    />
  );
};
