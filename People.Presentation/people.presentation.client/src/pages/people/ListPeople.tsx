import { Dispatch } from "react";
import * as peopleService from "../../services/people.service";
import { IResponseWrapper } from "../../models/response.model";
import { IPerson } from "../../models/person.model";
import { ColumnDef } from "@tanstack/react-table";
import { ReusableTable } from "../../components/tables/reusable-table/ReusableTable";
import Grid2 from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import { ConfirmationDialog } from "../../components/dialogs/confirmation-dialog/ConfirmationDialog";
import "./People.css";
import { BannerWithHeaderText } from "../../components/messaging/banner-with-header-text/BannerWithHeaderText";
import { ReusableSpinner } from "../../components/loaders/ReusableSpinner";
import { Typography } from "@mui/material";

interface ListPeopleProps {
  errorMessage: string;
  isConfirmDialogOpen: boolean;
  isLoading: boolean;
  isDeleting: boolean;
  allPeople: IPerson[];
  currentPerson: IPerson | undefined;
  setErrorMessage: Dispatch<React.SetStateAction<string>>;
  setIsDeleting: Dispatch<React.SetStateAction<boolean>>;
  setAllPeople: Dispatch<React.SetStateAction<IPerson[]>>;
  setIsCreateMode: Dispatch<React.SetStateAction<boolean>>;
  setIsConfirmDialogOpen: Dispatch<React.SetStateAction<boolean>>;
  setCurrentPerson: React.Dispatch<React.SetStateAction<IPerson | undefined>>;
}

/**
 * Lists all people
 *
 * @param {ListPeopleProps} listPeopleProps
 *
 * @returns {JSX.Element} component
 */
export const ListPeople = ({
  isConfirmDialogOpen,
  isDeleting,
  isLoading,
  allPeople,
  currentPerson,
  setIsDeleting,
  setErrorMessage,
  setIsConfirmDialogOpen,
  setAllPeople,
  setCurrentPerson,
  setIsCreateMode,
}: ListPeopleProps) => {
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
   * When the edit button for a row is clicked
   *
   * @param {IPerson} person
   */
  const onSelectPersonToUpdate = (person: IPerson) => {
    setIsCreateMode(false);
    setCurrentPerson(person);
  };

  /**
   * Handles the delete button press
   *
   * @param {IPerson} person
   */
  const onSelectPersonToDelete = (value: IPerson) => {
    setIsCreateMode(true);
    setCurrentPerson(value);
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
        String(currentPerson?.id)
      );

      // Throw an error which will bubble up if request not successful
      if (!apiResponse.success) {
        setErrorMessage(apiResponse.message);
        throw new Error(apiResponse.message);
      }

      // Removes the newly added person from the view when deletion is a success
      // This avoids too many unnecessary API calls
      setAllPeople(
        allPeople.filter((person: IPerson) => person.id !== currentPerson?.id)
      );

      setIsDeleting(false);
      setIsConfirmDialogOpen(true);
    } catch (error: any) {
      setIsDeleting(false);
      setErrorMessage(error.message);
    }
  };

  return (
    <Grid2>
      {isLoading || isDeleting ? (
        <ReusableSpinner
          spinnerSize={200}
          spinnerColor="#2563eb"
          minContainerHeight="50vh"
          loadingMessage={isLoading ? "Loading..." : "Deleting..."}
        />
      ) : (
        <>
          <Typography variant="h5" sx={{mb: 3, fontWeight: "bold"}}>Total People: ({allPeople.length})</Typography>
          {allPeople.length > 0 ? (
            <>
              <ReusableTable columns={tableColumns} data={allPeople} />
              <ConfirmationDialog
                title={"Delete Person"}
                description={`Are you sure you want to delete this person: ${currentPerson?.firstName} ${currentPerson?.lastName}?`}
                closeButtonLabel={"Cancel"}
                okButtonLabel={"Delete"}
                setIsModalOpen={setIsConfirmDialogOpen}
                isModalOpen={isConfirmDialogOpen}
                onConfirm={onConfirmDeletePerson}
              />
            </>
          ) : (
            <BannerWithHeaderText
              text="Psst! There's nobody here.."
              imageAlt="No people found"
              minContainerHeight="50vh"
              mdScreenMaxWidth={450}
              mdScreenMaxHeight={367}
              bannerImageHeight={300}
              bannerImageWidth={400}
            />
          )}
        </>
      )}
    </Grid2>
  );
};
