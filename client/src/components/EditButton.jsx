import React from "react";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import EditIcon from "@material-ui/icons/Edit";

export default function EditButton(props) {
  const [open, setOpen] = React.useState(false);
  const [thoughtsTitle, setThoughtsTitle] = React.useState(props.title);
  const [thoughtsBody, setThoughtsBody] = React.useState(props.body);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleThoughtsTitleChange = (event) => {
    setThoughtsTitle(event.target.value);
  };

  const handleThoughtsBodyChange = (event) => {
    setThoughtsBody(event.target.value);
  };

  return (
    <div>
      <Button size="small" onClick={handleClickOpen}>
        <EditIcon fontSize="small" />
      </Button>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        <AddIcon />
      </Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
        maxWidth={"md"}
      >
        <DialogTitle id="form-dialog-title">Edit Entry</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            fullWidth
            value={thoughtsTitle}
            onChange={handleThoughtsTitleChange}
          />
          <TextField
            margin="dense"
            id="body"
            label="Thoughts"
            fullWidth
            value={thoughtsBody}
            onChange={handleThoughtsBodyChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleClose();
              props.onChange({ title: thoughtsTitle, body: thoughtsBody });
            }}
            color="primary"
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
