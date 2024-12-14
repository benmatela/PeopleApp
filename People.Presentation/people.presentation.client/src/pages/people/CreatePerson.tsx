/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, SubmitHandler } from "react-hook-form";
import ReusableForm from "../../components/forms/ReusableForm";
import { IFormField } from "../../models/form.model";
import { useState } from "react";

/**
 * The structure of the reusable form data
 */
interface ICreatePersonFormData {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
}

const CreatePerson = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
    setIsSaving(true);
    try {
      const formFieldValues: ICreatePersonFormData = data as any;
      console.log(formFieldValues);
      console.log(errorMessage);
      console.log(successMessage);
      console.log(isSaving);
    } catch (error: any) {
      setErrorMessage(error.message);
      setSuccessMessage("");
      setIsSaving(false);
    }
  };

  return (
    <>
      <ReusableForm fields={formFields} onSubmit={onSubmit} isLoading={isSaving} />
    </>
  );
};

const formFields: IFormField[] = [
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "Enter your first name",
    validation: {
      required: "First Name is required",
      minLength: {
        value: 3,
        message: "First Name must be at least 3 characters",
      },
    },
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    placeholder: "Enter your last name",
    validation: {
      required: "Last Name is required",
      minLength: {
        value: 3,
        message: "Last Name must be at least 3 characters",
      },
    },
  },
  {
    name: "dateOfBirth",
    label: "Date Of Birth",
    type: "date",
    placeholder: "Enter your date of birth",
    validation: {
      required: "Date Of Birth is required",
      minLength: {
        value: 3,
        message: "Date Of Birth must be at least 3 characters",
      },
    },
  },
];

export default CreatePerson;
