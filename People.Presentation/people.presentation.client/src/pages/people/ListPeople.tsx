/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, useEffect, useState } from "react";
import * as peopleService from "../../services/people.service";
import { IResponseWrapper } from "../../models/response-wrapper.model";
import { IPerson, IPersonResponse } from "../../models/person.model";
import { CircleLoader } from "react-spinners";
import { ColumnDef } from "@tanstack/react-table";
import { ReusableTable } from "../../components/tables/ReusableTable";
import Grid2 from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Delete, Edit } from "@mui/icons-material";
import { ConfirmationDialog } from "../../components/dialogs/ConfirmationDialog";
import EmptyPersonImg from "../../assets/empty_people.svg";

interface ListPeopledProps {
  currentlySelectedPerson: IPerson | undefined;
  setIsCreateMode: Dispatch<React.SetStateAction<boolean>>;
  setCurrentlySelectedUser: React.Dispatch<
    React.SetStateAction<IPerson | undefined>
  >;
}

/**
 * List all people
 *
 * @param {ListPeopledProps} listPeopledProps
 *
 * @returns {JSX.Element} component
 */
export const ListPeople = ({
  currentlySelectedPerson,
  setCurrentlySelectedUser,
  setIsCreateMode,
}: ListPeopledProps) => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [allPeople, setAllPeople] = useState<IPerson[]>([]);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] =
    useState<boolean>(false);
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
            onSelectPersonToDelete(value.cell.row.original);
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
      cell: (value: any) => (
        <Button
          variant="contained"
          disabled={isLoading}
          onClick={() => {
            onSelectPersonToUpdate(value.cell.row.original);
          }}
        >
          <Edit /> Edit
        </Button>
      ),
    },
  ];

  useEffect(() => {
    getAllPeople();
  }, []);

  /**
   * Gets all people
   *
   * @throws {Error} error
   */
  const getAllPeople = async () => {
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

      setAllPeople(apiResponse.data);

      setSuccessMessage("People loaded successfully.");
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      throw new Error(error.message);
    }
  };

  /**
   * When the edit button for a row is clicked
   *
   * @param {IPerson} person
   */
  const onSelectPersonToUpdate = (person: IPerson) => {
    setIsCreateMode(false);
    setCurrentlySelectedUser(person);
  };

  /**
   * Handles the delete button press for a person row
   *
   * @param {IPerson} person
   */
  const onSelectPersonToDelete = (value: IPerson) => {
    setIsCreateMode(true);
    setCurrentlySelectedUser(value);
    setIsConfirmDialogOpen(true);
  };

  /**
   * Deletes a person after the dialog confirmation
   */
  const onConfirmDeletePerson = async () => {
    setIsDeleting(true);
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const apiResponse: IResponseWrapper<null> = await peopleService.remove(
        String(currentlySelectedPerson?.id)
      );

      console.log("apiResponse: ", apiResponse);

      if (!apiResponse.success) {
        setErrorMessage(apiResponse.message);
        setSuccessMessage("");
        throw new Error(apiResponse.message);
      }

      setSuccessMessage("Person deleted successfully.");
      setIsDeleting(false);
    } catch (error: any) {
      setIsDeleting(false);
      setErrorMessage(error.message);
    }
  };

  return (
    <Grid2>
      {isLoading || isDeleting ? (
        <Grid2>
          <CircleLoader size={100} color="#2563eb" />
        </Grid2>
      ) : (
        <>
          {allPeople.length > 0 ? (
            <>
              <p>{successMessage}</p>
              <p>{errorMessage}</p>
              <ReusableTable columns={tableColumns} data={allPeople} />

              <ConfirmationDialog
                title={"Delete Person"}
                description={`Are you sure you want to delete this person: ${currentlySelectedPerson?.firstName} ${currentlySelectedPerson?.lastName}?`}
                closeButtonLabel={"Cancel"}
                okButtonLabel={"Delete"}
                setIsModalOpen={setIsConfirmDialogOpen}
                isModalOpen={isConfirmDialogOpen}
                onConfirm={onConfirmDeletePerson}
              />
            </>
          ) : (
            <>
              <p>{successMessage}</p>
              <p>{errorMessage}</p>
              <Grid2
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{ minHeight: "50vh" }}
              >
                <p>Psst! There's nobody here. Add a new person ☝️</p>

                <Grid2>
                  <Box
                    component="img"
                    sx={{
                      height: 233,
                      width: 350,
                      maxHeight: { xs: 233, md: 167 },
                      maxWidth: { xs: 350, md: 250 },
                    }}
                    alt="People not found."
                    src={EmptyPersonImg}
                  />
                </Grid2>
              </Grid2>
            </>
          )}
        </>
      )}
    </Grid2>
  );
};
