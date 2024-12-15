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
import { Delete, Edit } from "@mui/icons-material";
import { ConfirmationDialog } from "../../components/dialogs/ConfirmationDialog";
import "./People.css";
import { BannerWithHeaderText } from "../../components/messaging/BannerWithHeaderText";

interface ListPeopleProps {
  currentlySelectedPerson: IPerson | undefined;
  setIsCreateMode: Dispatch<React.SetStateAction<boolean>>;
  setCurrentlySelectedUser: React.Dispatch<
    React.SetStateAction<IPerson | undefined>
  >;
}

/**
 * Lists all people
 *
 * @param {ListPeopleProps} listPeopleProps
 *
 * @returns {JSX.Element} component
 */
export const ListPeople = ({
  currentlySelectedPerson,
  setCurrentlySelectedUser,
  setIsCreateMode,
}: ListPeopleProps) => {
  /**
   * Holds error messages from performing certain actions
   */
  const [errorMessage, setErrorMessage] = useState<string>("");
  /**
   * Is there any data loading currently in progress?
   */
  const [isLoading, setIsLoading] = useState<boolean>(false);
  /**
   * Is there any delete action going on?
   */
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  /**
   * All people from the API
   */
  const [allPeople, setAllPeople] = useState<IPerson[]>([]);
  /**
   * Shows/Hides the Confirmation Dialog
   */
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] =
    useState<boolean>(false);
  /**
   * Table columns using custom headers
   */
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

  /**
   * Loads data once when the page loads
   */
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
    try {
      const apiResponse: IResponseWrapper<IPersonResponse[]> =
        await peopleService.getAll();

      if (!apiResponse.success) {
        setErrorMessage(apiResponse.message);
        throw new Error(apiResponse.message);
      }

      setAllPeople(apiResponse.data);

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
   * Handles the delete button press
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
    try {
      const apiResponse: IResponseWrapper<null> = await peopleService.remove(
        String(currentlySelectedPerson?.id)
      );

      if (!apiResponse.success) {
        setErrorMessage(apiResponse.message);
        throw new Error(apiResponse.message);
      }

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
              <Grid2
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{ minHeight: "50vh" }}
              >
                <BannerWithHeaderText
                  text="Psst! There's nobody here.."
                  imageAlt="No people found"
                  minContainerHeight="50vh"
                  mdScreenMaxWidth={450}
                  mdScreenMaxHeight={367}
                  bannerImageHeight={300}
                  bannerImageWidth={400}
                />
              </Grid2>
            </>
          )}
        </>
      )}
    </Grid2>
  );
};
