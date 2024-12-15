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
  closeButtonLabel: string;
  okButtonLabel: string;
  setIsModalOpen: Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
  onConfirm: Dispatch<React.SetStateAction<void>>;
}

/**
 * Confirmation Pop Up Modal
 *
 * @param {ConfirmationDialogProps} confirmationDialogProps
 *
 * @returns {JSX.Element} component
 */
export const ConfirmationDialog = ({
  closeButtonLabel,
  okButtonLabel,
  title,
  description,
  isModalOpen,
  setIsModalOpen,
  onConfirm,
}: ConfirmationDialogProps) => {
  /**
   * Handle dialog close
   */
  const handleClose = () => {
    setIsModalOpen(false);
  };

  /**
   * Handle confirm button click
   */
  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <React.Fragment>
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
          <Button onClick={handleClose}>{closeButtonLabel}</Button>
          <Button onClick={handleConfirm} autoFocus>
            {okButtonLabel}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
