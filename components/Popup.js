import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/CloseSharp";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles({
  dialogWrapper: {
    minWidth: 300,
    position: "absolute",
  },
  dialogTitle: {
    paddingRight: "0px",
  },
});

export default function Popup(props) {
  const { title, children, openPopup, setOpenPopup } = props;
  const classes = useStyles();

  return (
    <Dialog
      open={openPopup}
      onClose={() => {
        setOpenPopup(false);
      }}
      //maxWidth="lg"
      className={classes.dialogWrapper}>
      <DialogTitle className={classes.dialogTitle}>
        <div style={{ display: "flex" }}>
          <Typography variant='h6' component='div' style={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <Button
            color='secondary'
            onClick={() => {
              setOpenPopup(false);
            }}>
            <CloseIcon />
          </Button>
        </div>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
