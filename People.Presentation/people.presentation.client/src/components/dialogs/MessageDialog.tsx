import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Dispatch } from "react";

interface ConfirmationDialogProps {
  title: string;
  description: string;
  okButtonLabel: string;
  setIsModalOpen: Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
}

/**
 * Message Pop Up Modal
 *
 * @param {ConfirmationDialogProps} confirmationDialogProps
 *
 * @returns {JSX.Element} component
 */
export const MessageDialog = ({
  okButtonLabel,
  title,
  description,
  isModalOpen,
  setIsModalOpen,
}: ConfirmationDialogProps) => {
  const handleClickOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button>
      <Dialog
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{okButtonLabel}</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
