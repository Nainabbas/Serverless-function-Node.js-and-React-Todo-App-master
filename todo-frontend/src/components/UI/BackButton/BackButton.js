import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Fab from "@material-ui/core/Fab";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { withRouter } from "react-router";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const BackButton = (props) => {
  const classes = useStyles();

  const handleBackButton = () => {
    props.history.goBack();
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Fab color="default" className={classes.fab} onClick={handleBackButton} aria-label="back">
        <ArrowBackIosIcon />
      </Fab>
    </React.Fragment>
  );
};


export default withRouter(BackButton);
