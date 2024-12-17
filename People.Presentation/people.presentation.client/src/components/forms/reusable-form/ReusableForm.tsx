import {
  Grid2,
  TextField,
  Box,
  Button,
  FormLabel,
  Card,
  Typography,
} from "@mui/material";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { IFormField } from "../../../models/form.model";
import { ReusableSpinner } from "../../loaders/ReusableSpinner";

interface ReusableFormProps {
  submitBtnText: string;
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
  submitBtnText,
  isLoading,
  fields,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();
  const classes: any = useStyles; // Cleaner way to handle styles

  return (
    <Card sx={{
      backgroundColor: "#fffbeb",
    }}>
      <Grid2
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          borderRadius: 2,
          padding: 3,
        }}
      >
        <form
          className={classes.root}
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
        >
          {/* Dynamic Form Fields */}
          <Box sx={{ width: "100%" }}>
            <Grid2
              container
              spacing={2}
              justifyContent="center"
              sx={{ width: "100%", padding: 2 }}
            >
              {fields.map((field: IFormField) => (
                <Grid2
                  key={field.label}
                  sx={{
                    xs: { width: 12 },
                    sm: { width: 4 },
                  }}
                >
                  <Box>
                    <Grid2>
                      <FormLabel htmlFor={field.name}>{field.label}</FormLabel>
                    </Grid2>
                    <TextField
                      fullWidth
                      variant="outlined"
                      id={field.name}
                      type={field.type}
                      disabled={field.disabled}
                      placeholder={field.placeholder}
                      defaultValue={field.defaultValue}
                      {...register(field.name, field.validation)}
                    />
                    <Typography sx={{ color: "#dc2626", fontSize: 14 }}>
                      {errors[field.name] && (
                        <p>{String(errors[field.name]?.message)}</p>
                      )}
                    </Typography>
                  </Box>
                </Grid2>
              ))}
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
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={isLoading}
                    sx={{ width: "100%", height: 55, mt: 3 }}
                  >
                    {submitBtnText}
                  </Button>
                )}
              </Grid2>
            </Grid2>
          </Box>
        </form>
      </Grid2>
    </Card>
  );
};
