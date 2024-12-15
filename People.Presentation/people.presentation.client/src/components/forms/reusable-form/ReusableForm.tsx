import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { IFormField } from "../../../models/form.model";
import { CircleLoader } from "react-spinners";
import { Button, TextField, FormLabel, Grid2 } from "@mui/material";

interface ReusableFormProps {
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

/**
 * Reusable form using react hooks form
 *
 * @param {ReusableFormProps} reusableFormProps
 *
 * @returns {React.FC<ReusableFormProps>} component
 */
export const ReusableForm: React.FC<ReusableFormProps> = ({
  isLoading,
  fields,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  return (
    <Grid2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid2
          container
          direction="row"
          justifyContent={"space-evenly"}
          style={{ width: "100%" }}
        >
          {fields.map((field) => (
            <Grid2 key={field.name}>
              <Grid2>
                <FormLabel htmlFor={field.name}>{field.label}</FormLabel>
              </Grid2>
              <Grid2>
                <TextField
                  id={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  {...register(field.name, field.validation)}
                  style={{ minWidth: "" }}
                />
                <Grid2>
                  {errors[field.name] && (
                    <p>{String(errors[field.name]?.message)}</p>
                  )}
                </Grid2>
              </Grid2>
            </Grid2>
          ))}
          <Grid2>
            {isLoading ? (
              <div className="">
                <CircleLoader size={100} color="#2563eb" />
              </div>
            ) : (
              <Button variant="contained" type="submit" disabled={isLoading}>
                Submit
              </Button>
            )}
          </Grid2>
        </Grid2>
      </form>
    </Grid2>
  );
};
