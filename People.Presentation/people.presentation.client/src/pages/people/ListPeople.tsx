/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import * as peopleService from "../../services/people.service";
import { IResponseWrapper } from "../../models/response-wrapper.model";
import { IPerson, IPersonResponse } from "../../models/person.model";
import { CircleLoader } from "react-spinners";
import { Chip } from "@mui/material";
import { ColumnDef } from "@tanstack/react-table";
import { ReusableTable } from "../../components/tables/ReusableTable";

/**
 * @returns {JSX.Element} component
 */
export const ListPeople = () => {
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

  const tableColumns: ColumnDef<any, any>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "gender",
      header: "Gender",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (row: any) => {
        return (
          <Chip
            label={row.getValue()}
            size="small"
            color={row.getValue() === "active" ? "primary" : "default"}
          />
        );
      },
    },
  ];

  return (
    <>
      {isLoading ? (
        <div>
          <CircleLoader size={100} color="#2563eb" />
        </div>
      ) : (
        <ReusableTable columns={tableColumns} data={allPeople} />
      )}
      <p>{successMessage}</p>
      <p>{errorMessage}</p>
    </>
  );
};
