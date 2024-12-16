import {
  Container,
  Grid2,
  TextField,
  Box,
  Button,
  Typography,
  FormLabel,
} from "@mui/material";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { IFormField } from "../../../models/form.model";
import { ReusableSpinner } from "../../loaders/ReusableSpinner";

interface ReusableFormProps {
  /**
   * Label to be shown on the form
   */
  formLabel: string;
  /**
   * Is there any loading/saving/deleting going on?
   */
  isLoading: boolean;
  /**
   * Custom form fields to build a new form
   */
  fields: IFormField[];
  /**
   * Handles the submit button
   */
  onSubmit: SubmitHandler<FieldValues>;
}

const useStyles: any = () => ({
  root: {
    "& .MuiTextField-root": {
      width: "100%",
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
    },
  },
});

/**
 * Reusable form using react hooks form
 *
 * @param {ReusableFormProps} reusableFormProps
 *
 * @returns {React.FC<ReusableFormProps>} component
 */
export const ReusableForm: React.FC<ReusableFormProps> = ({
  formLabel,
  isLoading,
  fields,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();
  const classes: any = useStyles;

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow:
          "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        backgroundColor: "#f0f9ff",
        borderRadius: 2,
      }}
    >
      <form
        className={classes.root}
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <Box sx={{ width: "100%" }}>
          <Typography variant="h5" align="center" sx={{ margin: 2 }}>
            {formLabel}
          </Typography>

          {/* Grid2 to display form fields */}
          <Grid2 container spacing={2} justifyContent="center">
            {fields.map((field: IFormField) => (
              <Grid2
                sx={{
                  xs: { width: 12 },
                  sm: { width: 4 },
                }}
              >
                <Box>
                  <TextField
                    fullWidth
                    variant="outlined"
                    id={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    defaultValue={field.defaultValue}
                    {...register(field.name, field.validation)}
                  />
                  <p>
                    {errors[field.name] && (
                      <p>{String(errors[field.name]?.message)}</p>
                    )}
                  </p>
                </Box>
              </Grid2>
            ))}
          </Grid2>

          {/* Submit Button */}
          <Grid2 container spacing={2} justifyContent="center">
            {isLoading ? (
              <ReusableSpinner
                spinnerSize={50}
                spinnerColor="#2563eb"
                minContainerHeight="50vh"
                loadingMessage={isLoading ? "Loading..." : "Deleting..."}
              />
            ) : (
              <Button variant="contained" type="submit" disabled={isLoading}>
                Submit
              </Button>
            )}
          </Grid2>
        </Box>
      </form>
    </Container>
  );
};
