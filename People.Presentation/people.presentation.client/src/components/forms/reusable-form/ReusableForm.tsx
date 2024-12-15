import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { IFormField } from "../../../models/form.model";
import { Button, TextField, FormLabel, Grid2, Box } from "@mui/material";
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
    <Box
      sx={{
        padding: 5,
        boxShadow:
          "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        backgroundColor: "#f0f9ff",
        borderRadius: 5,
      }}
    >
      <form
        className={classes.root}
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <Box
          sx={{
            fontSize: "1.5rem",
            lineHeight: "2rem",
            paddingBottom: 2,
            fontWeight: 600,
          }}
        >
          {formLabel}
        </Box>
        <Grid2 container spacing={3} minWidth={"100vw"}>
          {fields.map((field) => (
            <Box
              key={field.name}
              sx={{
                sm: { minWidth: "100vw" },
                md: { minWidth: "100%", padding: "5px" },
              }}
            >
              <Grid2>
                <FormLabel htmlFor={field.name}>{field.label}</FormLabel>
              </Grid2>
              <TextField
                id={field.name}
                type={field.type}
                placeholder={field.placeholder}
                {...register(field.name, field.validation)}
                sx={{
                  sm: { minWidth: "100vw" },
                  md: { minWidth: "30%", padding: "5px" },
                }}
              />
              <Grid2>
                {errors[field.name] && (
                  <p>{String(errors[field.name]?.message)}</p>
                )}
              </Grid2>
            </Box>
          ))}
        </Grid2>
        <Grid2>
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
      </form>
    </Box>
  );
};
