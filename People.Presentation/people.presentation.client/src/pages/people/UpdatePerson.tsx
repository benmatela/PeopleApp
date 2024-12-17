import { FieldValues, SubmitHandler } from "react-hook-form";
import { IFormField } from "../../models/form.model";
import { Dispatch, useEffect, useState } from "react";
import * as peopleService from "../../services/people.service";
import { IResponseWrapper } from "../../models/response.model";
import { IPerson, IPersonResponse } from "../../models/person.model";
import { ReusableForm } from "../../components/forms/reusable-form/ReusableForm";
import { convertDateToYYYMMDD } from "../../utils/date.util";
import { Grid2 } from "@mui/material";

interface UpdatePersonProps {
  currentPerson: IPerson | undefined;
  setCurrentPerson: Dispatch<React.SetStateAction<IPerson | undefined>>;
  setIsCreateMode: Dispatch<React.SetStateAction<boolean>>;
  setOpenSnackbar: Dispatch<React.SetStateAction<boolean>>;
  setErrorMessage: Dispatch<React.SetStateAction<string>>;
  setSuccessMessage: Dispatch<React.SetStateAction<string>>;
}

/**
 * Update a person
 *
 * @param {UpdatePersonProps} updatePersonProps
 *
 * @returns {JSX.Element} component
 */
export const UpdatePerson = ({
  currentPerson,
  setCurrentPerson,
  setIsCreateMode,
  setOpenSnackbar,
  setErrorMessage,
  setSuccessMessage,
}: UpdatePersonProps) => {
  /**
   * Is there any loading action going on?
   */
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
      defaultValue: "",
      placeholder: "Date Of Birth",
      validation: {
        required: "Date Of Birth is required",
      },
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
      const personToCreate: IPerson = data as any;
      // Make sure we don't update and unknown person
      if (currentPerson) {
        personToCreate.id = currentPerson.id;

        updatePerson(personToCreate);
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
      const apiResponse: IResponseWrapper<IPersonResponse> =
        await peopleService.update(person);

      // Throw an error which will bubble up if request not successful
      if (!apiResponse.success) {
        throw new Error(apiResponse.message);
      }

      // Update global current person with the newly added person
      setCurrentPerson(apiResponse.data);

      // Update states when API call is successful
      setSuccessMessage(
        `${person.firstName} ${person.lastName} updated successfully..`
      );
      setErrorMessage("");
      setIsUpdating(false);
      setOpenSnackbar(true);
      setIsCreateMode(true);
    } catch (error: any) {
      setIsUpdating(false);

      // Throw error back to the calling function
      throw new Error(error.message);
    }
  };

  return (
    <Grid2>
      {/* Because "defaultValue" can only be set once when the form is being
      initialized, we wait for "formFields" to be auto populated then render the update form */}
      {!isLoading ? (
        <ReusableForm
          submitBtnText="Update Person"
          formLabel="Update Person"
          fields={formFields}
          onSubmit={onSubmit}
          isLoading={isUpdating}
        />
      ) : null}
    </Grid2>
  );
};
