/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, SubmitHandler } from "react-hook-form";
import { IFormField } from "../../models/form.model";
import { useState } from "react";
import * as peopleService from "../../services/people.service";
import { IResponseWrapper } from "../../models/response-wrapper.model";
import { IPerson, IPersonResponse } from "../../models/person.model";
import { ReusableForm } from "../../components/forms/reusable-form/ReusableForm";
import { InfoDialog } from "../../components/dialogs/info-dialog/InfoDialog";

/**
 * Creates a new person
 *
 * @returns {JSX.Element} component
 */
export const CreatePerson = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [currentPerson, setCurrentPerson] = useState<IPerson>();
  const [isMessageDialogOpen, setIsMessageDialogOpen] =
    useState<boolean>(false);

  const formFields: IFormField[] = [
    {
      name: "firstName",
      label: "First Name:",
      type: "text",
      placeholder: "First Name",
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
    try {
      const personToCreate: IPerson = data as any;
      setCurrentPerson(personToCreate);

      createNewPerson(personToCreate);
    } catch (error: any) {
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
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const apiResponse: IResponseWrapper<IPersonResponse> =
        await peopleService.create(person);

      if (!apiResponse.success) {
        setErrorMessage(apiResponse.message);
        setSuccessMessage("");
        throw new Error(apiResponse.message);
      }

      setSuccessMessage("Person created successfully.");
      setIsSaving(false);
      setIsMessageDialogOpen(true);
    } catch (error: any) {
      setIsSaving(false);
      throw new Error(error.message);
    }
  };

  return (
    <div>
      <h2>Create New Person</h2>
      <ReusableForm
        fields={formFields}
        onSubmit={onSubmit}
        isLoading={isSaving}
      />

      <InfoDialog
        title={"Success"}
        description={"Person created successfully."}
        okButtonLabel={"Ok"}
        setIsModalOpen={setIsMessageDialogOpen}
        isModalOpen={isMessageDialogOpen}
      />

      <p>{successMessage}</p>
      <p>{errorMessage}</p>
      <p>{currentPerson?.firstName}</p>
    </div>
  );
};
