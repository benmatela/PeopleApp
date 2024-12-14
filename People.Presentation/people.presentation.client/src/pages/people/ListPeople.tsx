/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import * as peopleService from "../../services/people.service";
import { IResponseWrapper } from "../../models/response-wrapper.model";
import { IPersonResponse } from "../../models/person.model";
import { CircleLoader } from "react-spinners";

/**
 * @returns {JSX.Element} component
 */
const ListPeople = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    getAllPeople();
  }, []);

  /**
   * Gets all people
   *
   * @throws {Error} error
   */
  const getAllPeople = async (): Promise<void> => {
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const apiResponse: IResponseWrapper<IPersonResponse[]> =
        await peopleService.getAll();

      if (!apiResponse.success) {
        setErrorMessage(apiResponse.message);
        setSuccessMessage("");
        throw new Error(apiResponse.message);
      }

      setSuccessMessage("People loaded successfully.");
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      throw new Error(error.message);
    }
  };

  return (
    <>
      {isLoading ? (
        <div>
          <CircleLoader size={100} color="#2563eb" />
        </div>
      ) : null}
      <p>{successMessage}</p>
      <p>{errorMessage}</p>
    </>
  );
};

export default ListPeople;
