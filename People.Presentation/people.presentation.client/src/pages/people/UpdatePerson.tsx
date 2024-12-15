import { FieldValues, SubmitHandler } from "react-hook-form";
import { IFormField } from "../../models/form.model";
import { Dispatch, useEffect, useState } from "react";
import * as peopleService from "../../services/people.service";
import { IResponseWrapper } from "../../models/response.model";
import { IPerson, IPersonResponse } from "../../models/person.model";
import { ReusableForm } from "../../components/forms/reusable-form/ReusableForm";
import { Grid2 } from "@mui/material";

interface UpdatePersonProps {
  allPeople: IPerson[];
  currentPerson: IPerson | undefined;
  setAllPeople: Dispatch<React.SetStateAction<IPerson[]>>;
  setCurrentPerson: Dispatch<React.SetStateAction<IPerson | undefined>>;
}

/**
 * Update a person
 *
 * @param {UpdatePersonProps} updatePersonProps
 *
 * @returns {JSX.Element} component
 */
export const UpdatePerson = ({
  allPeople,
  currentPerson,
  setCurrentPerson,
  setAllPeople,
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
   * Is there any updating action going on?
   */
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
   /**
   * Is there any loading action going on?
   */
   const [isLoading, setIsLoading] = useState<boolean>(true);
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
   * Populate default values for the Update person form
   */
  useEffect(() => {
    if (currentPerson) {
      const updatedFormFields = formFields;
      // First Name
      updatedFormFields[0].defaultValue = currentPerson.firstName;
      // Last Name
      updatedFormFields[1].defaultValue = currentPerson.lastName;
      // Date Of Birth
      updatedFormFields[2].defaultValue = currentPerson.dateOfBirth.toString();

      // Update state with default values
      setFormFields(updatedFormFields);

      setIsLoading(false);
    }
  }, [currentPerson, formFields, isLoading]);

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
      // Update state with thrown error if any
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

      // Adds the newly created person to the currently displayed list
      // This avoids too many unnecessary API calls
      const allExistingPeople: IPerson[] = allPeople;
      allExistingPeople.push(apiResponse.data);
      setAllPeople(allExistingPeople);

      // Update states when API call is successful
      setSuccessMessage("Person created successfully.");
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
      {/* Because "defaultValue" can only be set once when the form is is
      initialized, we wait for the update person data to be available */}
      {!isLoading ? (
        <ReusableForm
          formLabel="Update Person"
          fields={formFields}
          onSubmit={onSubmit}
          isLoading={isUpdating}
        />
      ) : null}
      <p>{successMessage}</p>
      <p>{errorMessage}</p>
    </Grid2>
  );
};
