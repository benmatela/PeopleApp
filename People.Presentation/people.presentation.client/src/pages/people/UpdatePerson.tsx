import { FieldValues, SubmitHandler } from "react-hook-form";
import { IFormField } from "../../models/form.model";
import { useState } from "react";
import * as peopleService from "../../services/people.service";
import { IResponseWrapper } from "../../models/response.model";
import { IPerson, IPersonResponse } from "../../models/person.model";
import { ReusableForm } from "../../components/forms/reusable-form/ReusableForm";
import { Grid2 } from "@mui/material";

interface UpdatePersonProps {
  /**
   * Controls whether we see the Create or Update form on the page
   */
  isCreateMode: boolean;
}

/**
 * Update a person
 *
 * @param {UpdatePersonProps} updatePersonProps
 *
 * @returns {JSX.Element} component
 */
export const UpdatePerson = ({ isCreateMode }: UpdatePersonProps) => {
  /**
   * Holds error messages from performing certain actions such as API calls
   */
  const [errorMessage, setErrorMessage] = useState<string>("");
  /**
   * Holds success messages from performing certain actions such as API calls
   */
  const [successMessage, setSuccessMessage] = useState<string>("");
  /**
   * Is there any updating action going on?
   */
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  /**
   * Current person being actioned on
   */
  const [currentPerson, setCurrentPerson] = useState<IPerson>();
  /**
   * Form fields to build the update person form
   */
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

      updatePerson(personToCreate);
    } catch (error: any) {
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
    setIsUpdating(true);
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const apiResponse: IResponseWrapper<IPersonResponse> =
        await peopleService.update(person);

      if (!apiResponse.success) {
        setErrorMessage(apiResponse.message);
        setSuccessMessage("");
        throw new Error(apiResponse.message);
      }

      setSuccessMessage("Person created successfully.");
      setIsUpdating(false);
    } catch (error: any) {
      setIsUpdating(false);
      throw new Error(error.message);
    }
  };

  return (
    <Grid2>
      Create Mode: {String(isCreateMode)}
      <ReusableForm
        formLabel="Create New Person"
        fields={formFields}
        onSubmit={onSubmit}
        isLoading={isUpdating}
      />
      <p>{successMessage}</p>
      <p>{errorMessage}</p>
      <p>{currentPerson?.firstName}</p>
    </Grid2>
  );
};
