import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";

const useStyles = makeStyles((theme) => ({
  fab: {
      position: "fixed",
      bottom: theme.spacing(10),
      right: theme.spacing(2),
  },
}));

const AddButton = (props) => {
  const classes = useStyles();

    return <Fab
      aria-label="add"
      className={classes.fab}
      onClick={props.handleAddButton}
    >
      <AddIcon />
    </Fab>
};

export default AddButton
