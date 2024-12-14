/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, SubmitHandler } from "react-hook-form";
import ReusableForm from "../../components/forms/ReusableForm";
import { IFormField } from "../../models/form.model";
import { useState } from "react";
import * as peopleService from "../../services/people.service";
import { IResponseWrapper } from "../../models/response-wrapper.model";
import { IPerson, IPersonResponse } from "../../models/person.model";

/**
 * @returns {JSX.Element} component
 */
const UpdatePerson = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [currentPerson, setCurrentPerson] = useState<IPerson>();

  /**
   * Submits the form
   *
   * @param {FieldValues} data
   */
  const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
    try {
      const personToCreate: IPerson = data as any;
      personToCreate.age = 0;

      setCurrentPerson(personToCreate);

      updatePerson(personToCreate).then((response: IPersonResponse) => {
        console.log(response);
      });
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
  const updatePerson = async (person: IPerson): Promise<IPersonResponse> => {
    setIsUpdating(true);
    try {
      const apiResponse: IResponseWrapper<IPersonResponse> =
        await peopleService.create(person);

      if (!apiResponse.success) {
        throw new Error(apiResponse.message);
      }

      setIsUpdating(false);

      return apiResponse.data;
    } catch (error: any) {
      setIsUpdating(false);
      throw new Error(error.message);
    }
  };

  return (
    <>
      <ReusableForm
        fields={formFields}
        onSubmit={onSubmit}
        isLoading={isUpdating}
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

export default UpdatePerson;
