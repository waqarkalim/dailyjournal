import React from "react";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import AddIcon from "@material-ui/icons/Add";

import logo from "../assets/moodForThought.png";

class AddButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      thoughtsTitle: "",
      thoughtsBody: "",
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleThoughtsTitleChange = (event) => {
    this.setState({ thoughtsTitle: event.target.value });
  };

  handleThoughtsBodyChange = (event) => {
    this.setState({ thoughtsBody: event.target.value });
  };

  render() {
    return (
      <div>
        <Button variant="outlined" onClick={this.handleClickOpen}>
          <AddIcon />
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          fullWidth={true}
          maxWidth={"md"}
        >
          <DialogTitle id="form-dialog-title" style={{ textAlign: "left" }}>
            Write Your Thoughts Here...
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Title"
              fullWidth
              value={this.state.thoughtsTitle}
              onChange={this.handleThoughtsTitleChange}
            />
            <TextField
              margin="dense"
              id="body"
              label="Thoughts"
              fullWidth
              value={this.state.thoughtsBody}
              onChange={this.handleThoughtsBodyChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => {
                this.handleClose();
                this.props.onChange({
                  title: this.state.thoughtsTitle,
                  body: this.state.thoughtsBody,
                });
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
}

export default AddButton;

// export default function AddButton(props) {
//   const [open, setOpen] = React.useState(false);
//   const [thoughtsTitle, setThoughtsTitle] = React.useState("");
//   const [thoughtsBody, setThoughtsBody] = React.useState("");

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleThoughtsTitleChange = (event) => {
//     setThoughtsTitle(event.target.value);
//   };

//   const handleThoughtsBodyChange = (event) => {
//     setThoughtsBody(event.target.value);
//   };

//   return (
//     <div>
//       <Button variant="outlined" onClick={handleClickOpen}>
//         <AddIcon />
//       </Button>
//       <Dialog
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="form-dialog-title"
//         fullWidth={true}
//         maxWidth={"md"}
//       >
//         <DialogTitle id="form-dialog-title" style={{ textAlign: "left" }}>
//           Write Your Thoughts Here...
//         </DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             id="title"
//             label="Title"
//             fullWidth
//             value={thoughtsTitle}
//             onChange={handleThoughtsTitleChange}
//           />
//           <TextField
//             margin="dense"
//             id="body"
//             label="Thoughts"
//             fullWidth
//             value={thoughtsBody}
//             onChange={handleThoughtsBodyChange}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="primary">
//             Cancel
//           </Button>
//           <Button
//             onClick={() => {
//               handleClose();
//               props.onChange({ title: thoughtsTitle, body: thoughtsBody });
//             }}
//             color="primary"
//           >
//             Done
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }
