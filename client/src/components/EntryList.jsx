// import React from "react";
// import Entry from "./Entry.jsx";

// class EntryList extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return (
// <div>
//   {this.props.entries.map((entry, i) => {
//     return (
//       <Entry
//         key={i}
//         title={entry.title}
//         text={entry.text}
//         sentiment={entry.sentiment}
//         date={entry.date}
//         style={{ margin: "20px" }}
//       />
//     );
//   })}
// </div>
//     );
//   }
// }

// export default EntryList;

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Paper from "@material-ui/core/Paper";

import Entry from "./Entry.jsx";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "50%",
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function EntryGrid(props) {
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();

  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };

  // <div>
  //   {this.props.entries.map((entry, i) => {
  //     return (
  //       <Entry
  //         key={i}
  //         title={entry.title}
  //         text={entry.text}
  //         sentiment={entry.sentiment}
  //         date={entry.date}
  //         style={{ margin: "20px" }}
  //       />
  //     );
  //   })}
  // </div>
  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="left" spacing={spacing}>
          {props.entries.map((entry, i) => {
            if (props.searchParams != "") {
              return;
            }
            return (
              <Grid item>
                <Entry
                  key={i}
                  entry_id={entry.entry_id}
                  title={entry.title}
                  body={entry.body}
                  user_id={entry.user_id}
                  sentiment={entry.score}
                  comparative={entry.comparative}
                  date={entry.date}
                  style={{ margin: "20px" }}
                  onDelete={(event) => {
                    console.log("Here");
                    console.log(props.entry_id);
                    props.onDelete(event);
                  }}
                  onEdit={(event) => {
                    props.onEdit(event);
                  }}
                />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
}
