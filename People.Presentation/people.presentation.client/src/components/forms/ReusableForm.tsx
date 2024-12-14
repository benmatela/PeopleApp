/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { IFormField } from "../../models/form.model";

interface ReusableFormProps {
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
const ReusableForm: React.FC<ReusableFormProps> = ({ fields, onSubmit }) => {
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
          />
          {errors[field.name] && (
            <span>{String(errors[field.name]?.message)}</span>
          )}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default ReusableForm;
