/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import * as peopleService from "../../services/people.service";
import { IResponseWrapper } from "../../models/response-wrapper.model";
import { IPerson, IPersonResponse } from "../../models/person.model";
import { CircleLoader } from "react-spinners";
import { ColumnDef } from "@tanstack/react-table";
import { ReusableTable } from "../../components/tables/ReusableTable";
import { Button } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

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

  const onEditTableRow = (value: any) => {
    console.log("value: ", value);
  };

  const onDeleteTableRow = (value: any) => {
    console.log("value: ", value);
  };

  const tableColumns: ColumnDef<any, any>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "firstName",
      header: "First Name",
    },
    {
      accessorKey: "lastName",
      header: "Last Name",
    },
    {
      accessorKey: "age",
      header: "Age",
    },
    {
      accessorKey: "dateOfBirth",
      header: "Date Of Birth",
    },
    {
      accessorKey: "dateCreated",
      header: "Created Date",
    },
    {
      id: "deletePerson",
      header: "Delete",
      accessorKey: "deletePerson",
      cell: (value: any) => (
        <Button
          variant="contained"
          disabled={isLoading}
          sx={{ backgroundColor: "#be123c", color: "white" }}
          onClick={() => {
            onDeleteTableRow(value);
          }}
        >
          <Delete /> Delete
        </Button>
      ),
    },
    {
      id: "editPerson",
      header: "Edit",
      accessorKey: "editPerson",
      cell: (cell: any) => (
        <Button
          variant="contained"
          disabled={isLoading}
          onClick={() => {
            onEditTableRow(cell.value);
          }}
        >
          <Edit /> Edit
        </Button>
      ),
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
