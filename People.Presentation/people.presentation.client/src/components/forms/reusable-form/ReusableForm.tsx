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
import { getAge } from "../../../utils/date.util";
import { Dispatch, useEffect } from "react";

interface ReusableFormProps {
  /**
   * Is this a Create or Update operation
   */
  isCreateMode: boolean;
  /**
   * Submit button label
   */
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
  /**
   * Change form mode(create or update)
   */
  setIsCreateMode: Dispatch<React.SetStateAction<boolean>>;
}

/**
 * This is the cleaner way of adding styling
 *
 * @returns {any} styles
 */
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
  isCreateMode,
  submitBtnText,
  isLoading,
  fields,
  onSubmit,
  setIsCreateMode,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<FieldValues>();
  const classes: any = useStyles; // Cleaner way to handle styles
  const dateOfBirth: string = watch("dateOfBirth", ""); // Watch date of birth

  /**
   * Watch the date of birth input value change and set age
   */
  useEffect(() => {
    // Only change to new date if the watch field has a value
    if (dateOfBirth.length > 0) {
      setValue("age", getAge(new Date(dateOfBirth)));
    } else {
      setValue("age", fields[3].defaultValue);
    }
  });

  /**
   * When the cancel button is clicked
   */
  const onCancel = () => {
    /**
     * If in create mode we just clear the form
     *
     * If we are in update mode we go back to create form
     */
    if (isCreateMode) {
      reset();
    } else {
      reset();
      setIsCreateMode(true);
    }
  };

  return (
    <Card
      sx={{
        backgroundColor: "#fffbeb",
      }}
    >
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
                        <>{String(errors[field.name]?.message)}</>
                      )}
                    </Typography>
                  </Box>
                </Grid2>
              ))}
              {/* Submit Button */}
              <Grid2
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="outlined"
                  type="button"
                  onClick={onCancel}
                  disabled={isLoading}
                  sx={{ width: "190px", height: 55, mt: 3, mr: 2 }}
                >
                  {isCreateMode ? "Clear" : "Cancel"}
                </Button>
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
                    sx={{ width: "190px", height: 55, mt: 3 }}
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
