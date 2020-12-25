import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import ContentView from "../UI/ContentView/ContentView";

import AssignmentIcon from '@material-ui/icons/Assignment';
import Notification from "../UI/Notification/Notification";


import { connect } from "react-redux";
import Spinner from "../UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  error: {
    border: "1px solid red",
    borderRadius: "4px",
    width: "100%",
    color: "red",
    padding: "15px",
    fontWeight: "bold",
  },
  center: { margin: "5px auto" },
}));

const AddTodo = (props) => {
  const classes = useStyles();
  const [description, setDescription] = useState({ value: "" });
  const [title, setTitle] = useState({ value: "" });

  const onFieldChange = (event, fieldName) => {
    switch (fieldName) {
      case "title":
        setTitle({ value: event.target.value });
        break;
      case "description":
        setDescription({ value: event.target.value });
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onAddTodo({
      description: description.value,
      title: title.value,
      status: false
    }, props.history)
  };

  let form = (
    <>
      <TextField
        variant="outlined"
        margin="normal"
        required
        focused
        fullWidth
        type="text"
        id="title"
        name="title"
        onChange={(event) => onFieldChange(event, "title")}
        label="Title"
        value={title.value}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="description"
        label="Description"
        type="text"
        id="description"
        autoComplete="description"
        value={description.value}
        onChange={(event) => onFieldChange(event, "description")}
      />
    </>
  );

  if (props.loading) {
    form = <Spinner />;
  }

  let errorMessage = null;
  if (props.error) {
    const message = props.error?.message;
    const severity = message.toLowerCase().includes("successfully")
      ? "success"
      : "error";
    errorMessage = <Notification severity={severity} message={message} />;
  }
  return (
    <ContentView>
      <CssBaseline />
      <Avatar className={[classes.avatar, classes.center].join(" ")} ><AssignmentIcon /></Avatar>
      {errorMessage}
      <form className={classes.form}>
        {form}
        <Button
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleSubmit}
          startIcon={<SaveIcon />}
        >
          Add Todo
        </Button>
      </form>
    </ContentView>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddTodo: (todo, history) => dispatch(actions.addTodo(todo, history)),
  };
};
const mapStateToProps = (state) => {
  return {
    loading: state.todo.loading,
    error: state.todo.error,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps // or put null here if you do not have actions to dispatch
)(AddTodo);
