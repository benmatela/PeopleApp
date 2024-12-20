import { Dispatch, useRef, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import * as peopleService from "../../services/people.service";
import { IResponseWrapper } from "../../models/response.model";
import { IPerson, IPersonResponse } from "../../models/person.model";
import { IFormField } from "../../models/form.model";
import ReusableForm from "../../components/forms/reusable-form/ReusableForm";

interface CreatePersonProps {
  isCreateMode: boolean;
  setIsCreateMode: Dispatch<React.SetStateAction<boolean>>;
  setOpenSnackbar: Dispatch<React.SetStateAction<boolean>>;
  setErrorMessage: Dispatch<React.SetStateAction<string>>;
  setSuccessMessage: Dispatch<React.SetStateAction<string>>;
  setPersonCreated: Dispatch<React.SetStateAction<IPerson | undefined>>;
}

/**
 * Creates a new person
 *
 * @param {CreatePersonProps} createPersonProps
 *
 * @returns {JSX.Element} component
 */
export const CreatePerson = ({
  isCreateMode,
  setOpenSnackbar,
  setErrorMessage,
  setSuccessMessage,
  setIsCreateMode,
  setPersonCreated,
}: CreatePersonProps) => {
  /**
   * Is there any saving action going on?
   */
  const [isSaving, setIsSaving] = useState<boolean>(false);
  /**
   *  Create a reference to the child component
   *
   *  Will be used to perform actions such as reseting form after submitting
   */
  const reusableFormRef: React.MutableRefObject<any> = useRef();
  /**
   * Form fields to build the create a person form
   *
   * We don't use "useState" because we don't expect the fields to change
   */
  const formFields: IFormField[] = [
    {
      name: "firstName",
      label: "First Name:",
      type: "text",
      placeholder: "First Name",
      defaultValue: "",
      disabled: false,
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
      label: "Last Name:",
      type: "text",
      defaultValue: "",
      disabled: false,
      placeholder: "Last Name",
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
      label: "Date Of Birth:",
      type: "date",
      placeholder: "Date Of Birth",
      defaultValue: "",
      disabled: false,
      validation: {
        required: "Date Of Birth is required",
      },
    },
    {
      name: "age",
      label: "Age:",
      type: "text",
      placeholder: "Age",
      defaultValue: "0", // Default age is 0 before date is selected on the form
      disabled: true,
    },
  ];

  /**
   * Submits the form
   *
   * @param {FieldValues} data
   */
  const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const personToCreate: IPerson = data as any;

      createNewPerson(personToCreate);
    } catch (error: any) {
      // Update the state with the bubbled up error if any
      setErrorMessage(error.message);
      setSuccessMessage("");
    }
  };

  /**
   * Creates a new person
   *
   * @param {IPerson} person
   *
   * @throws {Error} error
   */
  const createNewPerson = async (person: IPerson): Promise<void> => {
    setIsSaving(true);
    try {
      const apiResponse: IResponseWrapper<IPersonResponse> =
        await peopleService.create(person);

      // Throw an error which will bubble up if request not successful
      if (!apiResponse.success) {
        throw new Error(apiResponse.message);
      }

      // Update parent component with newly created person
      setPersonCreated(apiResponse.data);

      // Update states when API call is successful
      setSuccessMessage(
        `${person.firstName} ${person.lastName} created successfully..`
      );
      setErrorMessage("");
      setIsSaving(false);
      setOpenSnackbar(true);

      // Call the method in the child component to clear the form
      if (reusableFormRef && reusableFormRef.current) {
        reusableFormRef.current.resetForm();
      }
    } catch (error: any) {
      setIsSaving(false);

      // Throw error back to the calling function
      throw new Error(error.message);
    }
  };

  return (
    <ReusableForm
      submitBtnText={"Add New Person"}
      formLabel="Add New Person"
      fields={formFields}
      isLoading={isSaving}
      isCreateMode={isCreateMode}
      setIsCreateMode={setIsCreateMode}
      onSubmit={onSubmit}
      ref={reusableFormRef}
    />
  );
};
