/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, SubmitHandler } from "react-hook-form";
import ReusableForm from "../../components/forms/ReusableForm";
import { IFormField } from "../../models/form.model";
import { useState } from "react";
import {
  ICreatePersonRequest,
  IPersonResponse,
} from "../../models/person.model";
import * as peopleService from "../../services/people.service";
import { IResponseWrapper } from "../../models/response-wrapper.model";

/**
 * @returns {JSX.Element} component
 */
const CreatePerson = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [currentPerson, setCurrentPerson] = useState<ICreatePersonRequest>();

  /**
   * Submits the form
   *
   * @param {FieldValues} data
   */
  const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
    try {
      const personToCreate: ICreatePersonRequest = data as any;
      personToCreate.age = 0;
      personToCreate.dateCreated = "";

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
   * @param {ICreatePersonRequest} person
   *
   * @throws {Error} error
   */
  const createNewPerson = async (
    person: ICreatePersonRequest
  ): Promise<IPersonResponse> => {
    setIsSaving(true);
    try {
      const apiResponse: IResponseWrapper<IPersonResponse> =
        await peopleService.create(person);

      if (!apiResponse.success) {
        throw new Error(apiResponse.message);
      }

      setIsSaving(false);

      return apiResponse.data;
    } catch (error: any) {
      setIsSaving(false);
      throw new Error(error.message);
    }
  };

  return (
    <>
      <ReusableForm
        fields={formFields}
        onSubmit={onSubmit}
        isLoading={isSaving}
      />
      <p>{successMessage}</p>
      <p>{errorMessage}</p>
      <p>{currentPerson?.firstName}</p>
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
    },
  },
];

export default CreatePerson;
