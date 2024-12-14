/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import * as peopleService from "../../services/people.service";
import { IResponseWrapper } from "../../models/response-wrapper.model";
import { IPerson, IPersonResponse } from "../../models/person.model";
import { CircleLoader } from "react-spinners";
import { CustomPaginationActionsTable } from "../../components/tables/TablePaginationActionsProps";

/**
 * @returns {JSX.Element} component
 */
const ListPeople = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allPeople, setAllPeople] = useState<IPerson[]>([]);

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

      console.log("response: ", apiResponse);

      setAllPeople(apiResponse.data);

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
      ) : (
        <CustomPaginationActionsTable
          rows={allPeople}
          tableColumns={tableColumns}
        />
      )}
      <p>{successMessage}</p>
      <p>{errorMessage}</p>
    </>
  );
};

const tableColumns: string[] = [
  "Id",
  "First Name",
  "Last Name",
  "Date Of Birth",
  "Age",
];

export default ListPeople;
