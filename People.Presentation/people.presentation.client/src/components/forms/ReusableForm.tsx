/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { IFormField } from "../../models/form.model";
import { CircleLoader } from "react-spinners";

interface ReusableFormProps {
  isLoading: boolean;
  fields: IFormField[];
  onSubmit: SubmitHandler<FieldValues>;
}

/**
 * Reusable form using react hooks form
 *
 * @param {ReusableFormProps} reusableFormProps
 *
 * @returns {React.FC<ReusableFormProps>} component
 */
const ReusableForm: React.FC<ReusableFormProps> = ({
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
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field) => (
        <div key={field.name}>
          <label htmlFor={field.name}>{field.label}</label>
          <input
            id={field.name}
            type={field.type}
            placeholder={field.placeholder}
            {...register(field.name, field.validation)}
            className=""
          />
          {errors[field.name] && (
            <span>{String(errors[field.name]?.message)}</span>
          )}
        </div>
      ))}
      {isLoading ? (
        <div className="d-flex justify-content-center">
          <CircleLoader size={100} color="#2563eb" />
        </div>
      ) : (
        <button type="submit" disabled={isLoading}>
          Submit
        </button>
      )}
    </form>
  );
};

export default ReusableForm;
