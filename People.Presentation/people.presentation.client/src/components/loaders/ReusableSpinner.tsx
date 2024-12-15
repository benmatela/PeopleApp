import { Grid2 } from "@mui/material";
import { CircleLoader } from "react-spinners";

interface ReusableSpinnerProps {
  minContainerHeight: string;
  loadingMessage: string;
  spinnerSize: number;
  spinnerColor: string;
}

/**
 * Default spinner
 *
 * @param {ReusableSpinnerProps} reusableSpinnerProps
 *
 * @returns {JSX.Element} component
 */
export const ReusableSpinner = ({
  minContainerHeight,
  loadingMessage,
  spinnerSize,
  spinnerColor,
}: ReusableSpinnerProps) => {
  return (
    <Grid2
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: minContainerHeight }}
    >
      <h3>{loadingMessage}</h3>
      <Grid2>
        <CircleLoader size={spinnerSize} color={spinnerColor} />
      </Grid2>
    </Grid2>
  );
};
