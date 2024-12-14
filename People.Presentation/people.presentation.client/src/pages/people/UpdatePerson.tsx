/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, SubmitHandler } from "react-hook-form";
import { IFormField } from "../../models/form.model";
import { useState } from "react";
import * as peopleService from "../../services/people.service";
import { IResponseWrapper } from "../../models/response-wrapper.model";
import { IPerson, IPersonResponse } from "../../models/person.model";
import { ReusableForm } from "../../components/forms/ReusableForm";
import { Grid2 } from "@mui/material";

/**
 * @returns {JSX.Element} component
 */
export const UpdatePerson = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [currentPerson, setCurrentPerson] = useState<IPerson>();
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
      <h2>Update Person</h2>
      <ReusableForm
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
