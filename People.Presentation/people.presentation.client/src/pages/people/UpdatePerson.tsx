import { FieldValues, SubmitHandler } from "react-hook-form";
import { IFormField } from "../../models/form.model";
import { Dispatch, useEffect, useState } from "react";
import * as peopleService from "../../services/people.service";
import { IResponseWrapper } from "../../models/response.model";
import { IPerson, IPersonResponse } from "../../models/person.model";
import { ReusableForm } from "../../components/forms/reusable-form/ReusableForm";
import { Grid2 } from "@mui/material";
import { convertDateToYYYMMDD } from "../../utils/date.util";
import { InfoDialog } from "../../components/dialogs/info-dialog/InfoDialog";

interface UpdatePersonProps {
  currentPerson: IPerson | undefined;
  isUpdating: boolean;
  setCurrentPerson: Dispatch<React.SetStateAction<IPerson | undefined>>;
  setIsUpdating: Dispatch<React.SetStateAction<boolean>>;
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
  isUpdating,
  setCurrentPerson,
  setIsUpdating,
}: UpdatePersonProps) => {
  /**
   * Holds error messages from performing certain actions such as API calls
   */
  const [errorMessage, setErrorMessage] = useState<string>("");
  /**
   * Holds success messages from performing certain actions such as API calls
   */
  const [successMessage, setSuccessMessage] = useState<string>("");
  /**
   * Is there any loading action going on?
   */
  const [isLoading, setIsLoading] = useState<boolean>(true);
  /**
   * Shows/Hides the Confirmation Dialog
   */
  const [isInfoDialogOpen, setInfoDialogOpen] = useState<boolean>(false);
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

  useEffect(() => {
    onPopulateUpdateForm();
  });

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

      console.log("response: ", apiResponse);

      // Update global current person with the newly added person
      setCurrentPerson(apiResponse.data);

      // Update states when API call is successful
      setSuccessMessage("Person updated successfully.");
      setErrorMessage("");
      setIsUpdating(false);
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
          formLabel="Update Person"
          fields={formFields}
          onSubmit={onSubmit}
          isLoading={isUpdating}
        />
      ) : null}
      <InfoDialog
        okButtonLabel="Ok"
        title="Success"
        description={`${currentPerson?.firstName} ${currentPerson?.lastName} updated successfully`}
        isModalOpen={isInfoDialogOpen}
        setIsModalOpen={setInfoDialogOpen}
      />
      <p>{successMessage}</p>
      <p>{errorMessage}</p>
    </Grid2>
  );
};
