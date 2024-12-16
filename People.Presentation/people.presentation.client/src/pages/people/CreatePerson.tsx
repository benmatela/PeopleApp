import { Dispatch, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import * as peopleService from "../../services/people.service";
import { IResponseWrapper } from "../../models/response.model";
import { IPerson, IPersonResponse } from "../../models/person.model";
import { ReusableForm } from "../../components/forms/reusable-form/ReusableForm";
import { IFormField } from "../../models/form.model";
import { InfoDialog } from "../../components/dialogs/info-dialog/InfoDialog";

interface CreatePersonProps {
  currentPerson: IPerson | undefined;
  isSaving: boolean;
  setCurrentPerson: Dispatch<React.SetStateAction<IPerson | undefined>>;
  setPersonCreated: Dispatch<React.SetStateAction<boolean>>;
  setIsSaving: Dispatch<React.SetStateAction<boolean>>;
}

/**
 * Creates a new person
 *
 * @param {CreatePersonProps} createPersonProps
 *
 * @returns {JSX.Element} component
 */
export const CreatePerson = ({
  currentPerson,
  setPersonCreated,
  setCurrentPerson,
}: CreatePersonProps) => {
  /**
   * Holds error messages from performing certain actions such as API calls
   */
  const [errorMessage, setErrorMessage] = useState<string>("");
  /**
   * Holds success messages from performing certain actions such as API calls
   */
  const [successMessage, setSuccessMessage] = useState<string>("");
  /**
   * Is there any saving action going on?
   */
  const [isSaving, setIsSaving] = useState<boolean>(false);
  /**
   * Shows/Hides the Confirmation Dialog
   */
  const [isInfoDialogOpen, setInfoDialogOpen] = useState<boolean>(false);
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
      validation: {
        required: "Date Of Birth is required",
      },
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

      // Create global current person with the newly added person
      setCurrentPerson(apiResponse.data);

      // Update states when API call is successful
      setSuccessMessage("Person created successfully.");
      setErrorMessage("");
      setIsSaving(false);
      setPersonCreated(true);
    } catch (error: any) {
      setIsSaving(false);

      // Throw error back to the calling function
      throw new Error(error.message);
    }
  };

  return (
    <div>
      <ReusableForm
        submitBtnText={"Add New Person"}
        formLabel="Add New Person"
        fields={formFields}
        onSubmit={onSubmit}
        isLoading={isSaving}
      />
      <InfoDialog
        okButtonLabel="Ok"
        title="Success"
        description={`${currentPerson?.firstName} ${currentPerson?.lastName} created successfully`}
        isModalOpen={isInfoDialogOpen}
        setIsModalOpen={setInfoDialogOpen}
      />
      <p>{successMessage}</p>
      <p>{errorMessage}</p>
    </div>
  );
};
