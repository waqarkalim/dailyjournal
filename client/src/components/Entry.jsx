import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";

import EditButton from "./EditButton.jsx";

const Render = require("react-emoji-render");

const Emoji = Render.Emojione;

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    align: "left",
    width: "50%",
    margin: "20px",
    maxWidth: "50%",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Entry(props) {
  const classes = useStyles();

  const handleDelete = () => {
    const answer = window.confirm("Would you like to delete this entry?");
    console.log(answer);
    console.log(props);
    if (answer) {
      console.log("Here");
      console.log(props.entry_id);
      props.onDelete(props.entry_id);
    }
  };

  const handleEdit = (event) => {
    const deepProps = JSON.parse(JSON.stringify(props));
    const newObject = Object.assign(deepProps, {
      title: event.title,
      body: event.body,
    });
    console.log(newObject);
    props.onEdit(newObject);
  };

  let outputEmoji = "";

  if (props.sentiment > 0) {
    outputEmoji = ":)";
  } else if (props.sentiment === 0) {
    outputEmoji = ":|";
  } else {
    outputEmoji = ":(";
  }

  return (
    <Card className={classes.root} style={{ backgroundColor: "#edf6f9" }}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {props.date}
        </Typography>
        <Typography variant="h6" component="h2">
          {props.title}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {React.createElement(Emoji, { text: outputEmoji })}
          {/* {props.sentiment} */}
        </Typography>
        <Typography variant="body2" component="p">
          {props.body}
        </Typography>
      </CardContent>
      <CardActions>
        <EditButton
          title={props.title}
          body={props.body}
          onChange={handleEdit}
        />
        <Button size="small" onClick={handleDelete}>
          <DeleteIcon fontSize="small" />
        </Button>
      </CardActions>
    </Card>
  );
}
