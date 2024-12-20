import { FieldValues, SubmitHandler } from "react-hook-form";
import { IFormField } from "../../models/form.model";
import { Dispatch, useEffect, useRef, useState } from "react";
import * as peopleService from "../../services/people.service";
import { IResponseWrapper } from "../../models/response.model";
import { IPerson } from "../../models/person.model";
import { convertDateToYYYMMDD } from "../../utils/date.util";
import { Grid2 } from "@mui/material";
import ReusableForm from "../../components/forms/reusable-form/ReusableForm";

interface UpdatePersonProps {
  currentPerson: IPerson | undefined;
  isCreateMode: boolean;
  setCurrentSelectedPerson: Dispatch<React.SetStateAction<IPerson | undefined>>;
  setIsCreateMode: Dispatch<React.SetStateAction<boolean>>;
  setOpenSnackbar: Dispatch<React.SetStateAction<boolean>>;
  setErrorMessage: Dispatch<React.SetStateAction<string>>;
  setSuccessMessage: Dispatch<React.SetStateAction<string>>;
  setPersonUpdated: Dispatch<React.SetStateAction<IPerson | undefined>>;
}

/**
 * Update a person
 *
 * @param {UpdatePersonProps} updatePersonProps
 *
 * @returns {JSX.Element} component
 */
export const UpdatePerson = ({
  isCreateMode,
  currentPerson,
  setCurrentSelectedPerson,
  setIsCreateMode,
  setOpenSnackbar,
  setErrorMessage,
  setSuccessMessage,
  setPersonUpdated,
}: UpdatePersonProps) => {
  /**
   * Is there any loading action going on?
   */
  const [isLoading, setIsLoading] = useState<boolean>(true);
  /**
   *  Create a reference to the child component
   *
   *  Will be used to perform actions such as reseting form after submitting
   */
  const reusableFormRef: React.MutableRefObject<any> = useRef();
  /**
   * Is there any update in action?
   */
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  /**
   * Form fields to build the update person form
   *
   * We use "useState" compared to what we have in Create form because we
   * expect the fields to change(set default values using "currentPerson" variable)
   */
  const [formFields, setFormFields] = useState<IFormField[]>([
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
      placeholder: "Last Name",
      defaultValue: "",
      disabled: false,
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
  ]);

  /**
   * Auto populate fields when page loads
   */
  useEffect(() => {
    onPopulateUpdateForm();
  });

  /**
   * Auto populates the "defaultValue" for the Update user form
   */
  const onPopulateUpdateForm = () => {
    if (currentPerson) {
      const updatedFormFields = formFields;
      updatedFormFields[0].defaultValue = currentPerson.firstName;
      updatedFormFields[1].defaultValue = currentPerson.lastName;
      updatedFormFields[2].defaultValue = convertDateToYYYMMDD(
        currentPerson.dateOfBirth.toString()
      );
      updatedFormFields[3].defaultValue = currentPerson.age;
      // Update state with default values
      setFormFields(updatedFormFields);

      setIsLoading(false);
    }
  };

  /**
   * Submits the form
   *
   * @param {FieldValues} data
   */
  const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const personToUpdate: IPerson = data as any;
      // Make sure we don't update an unknown person
      if (currentPerson) {
        personToUpdate.id = currentPerson.id;
        personToUpdate.dateCreated = currentPerson.dateCreated;

        updatePerson(personToUpdate);
      }
    } catch (error: any) {
      // Update the state with the bubbled up error if any
      setErrorMessage(error.message);
      setSuccessMessage("");
    }
  };

  /**
   * Updates a person
   *
   * @param {IPerson} person
   *
   * @throws {Error} error
   */
  const updatePerson = async (person: IPerson): Promise<void> => {
    try {
      const apiResponse: IResponseWrapper<null> =
        await peopleService.update(person);

      // Throw an error which will bubble up if request not successful
      if (!apiResponse.success) {
        throw new Error(apiResponse.message);
      }

      // Update parent component with newly updated person
      setPersonUpdated(person);

      // Reset selected person because form will reset(no person selected anymore)
      setCurrentSelectedPerson(undefined);

      // Update states when API call is successful
      setSuccessMessage(
        `${person.firstName} ${person.lastName} updated successfully..`
      );
      setErrorMessage("");
      setIsUpdating(false);
      setOpenSnackbar(true);
      setIsCreateMode(true);

      // Call the method in the child component to clear the form
      if (reusableFormRef && reusableFormRef.current) {
        reusableFormRef.current.resetForm();
      }
    } catch (error: any) {
      setIsUpdating(false);

      // Throw error back to the calling function
      throw new Error(error.message);
    }
  };

  return (
    <Grid2 sx={{ mt: 2 }}>
      {/* Because "defaultValue" can only be set once when the form is being
      initialized, we wait for "formFields" to be auto populated then render the update form */}
      {!isLoading ? (
        <ReusableForm
          submitBtnText="Update Person"
          formLabel="Update Person"
          fields={formFields}
          isLoading={isUpdating}
          onSubmit={onSubmit}
          isCreateMode={isCreateMode}
          setIsCreateMode={setIsCreateMode}
          ref={reusableFormRef}
        />
      ) : null}
    </Grid2>
  );
};
