import { Dispatch, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import * as peopleService from "../../services/people.service";
import { IResponseWrapper } from "../../models/response.model";
import { IPerson, IPersonResponse } from "../../models/person.model";
import { ReusableForm } from "../../components/forms/reusable-form/ReusableForm";
import { IFormField } from "../../models/form.model";

interface CreatePersonProps {
  allPeople: IPerson[];
  currentPerson: IPerson | undefined;
  setCurrentPerson: Dispatch<React.SetStateAction<IPerson | undefined>>;
  setAllPeople: Dispatch<React.SetStateAction<IPerson[]>>;
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
  allPeople,
  setCurrentPerson,
  setAllPeople,
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
   * Form fields to build the create a person form
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

      // Throw an error which will bubble up if request not successful
      if (!apiResponse.success) {
        setErrorMessage(apiResponse.message);
        setSuccessMessage("");
        throw new Error(apiResponse.message);
      }

      // Adds the newly create person to the currently displayed list
      // This avoids too many unnecessary API calls
      const allExistingPeople: IPerson[] = allPeople;
      allExistingPeople.push(apiResponse.data);
      setAllPeople(allExistingPeople);

      setSuccessMessage("Person created successfully.");
      setIsSaving(false);
    } catch (error: any) {
      setIsSaving(false);
      throw new Error(error.message);
    }
  };

  return (
    <div>
      <ReusableForm
        formLabel="Add New Person"
        fields={formFields}
        onSubmit={onSubmit}
        isLoading={isSaving}
      />
      <p>{successMessage}</p>
      <p>{errorMessage}</p>
      <p>{currentPerson?.firstName}</p>
    </div>
  );
};
