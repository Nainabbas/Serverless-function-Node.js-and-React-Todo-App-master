import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import { green, lightBlue } from "@material-ui/core/colors";

import { connect } from "react-redux";
import Spinner from "../UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";
import ContentView from "../UI/ContentView/ContentView";
import { DataGrid } from "@material-ui/data-grid";
import AddButton from "../UI/AddButton/AddButton";

import Notification from "../UI/Notification/Notification";
import { formatDateTime } from "../../shared/utility";
import CachedIcon from "@material-ui/icons/Cached";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const useStyles = makeStyles((theme) => ({
  error: {
    border: "1px solid red",
    borderRadius: "4px",
    width: "100%",
    color: "red",
    padding: "15px",
    fontWeight: "bold",
  },
  button: {
    margin: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: window.innerHeight - 100 ,
  },
}));

const TodosList = (props) => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    props.loadTodos();
  }, []);

  useEffect(() => {}, [props.todos]);

  const getSelectedRow = (params) => {
    setSelectedRow({ ...params });
    props.onSelectTodo({ ...params.data });
  };

  const handleDelete = (id) => {
    props.deleteTodo(id);
  };

  const handleEdit = () => {
    props.history.push("editTodo");
  };

  const handleAdd = () => {
    props.history.push("addTodo");
  };

  const columns = [
    { field: "id", hide: true },
    { field: "title", headerName: "Title", width: 200 },
    { field: "description", headerName: "Description", width: 300 },
    {
      field: "status",
      headerName: "Status",
      renderCell: (params) =>
        params.row.status ? (
          <CheckCircleIcon style={{ color: green[500] }} />
        ) : (
          <CachedIcon style={{ color: lightBlue[500] }} />
        ),
    },
    { field: "createdAt", headerName: "CreatedAt", width: 180 },
    { field: "updatedAt", headerName: "UpdatedAt", width: 180 },
    {
      width: 130,
      field: "",
      headerName: "Action",
      renderCell: (params) => (
        <div className={classes.buttons}>
          <IconButton
            color="secondary"
            onClick={() => handleDelete(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton color="primary" onClick={() => handleEdit()}>
            <EditIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  let data = null;
  if (props.todos?.length) {
    data = (
      <DataGrid
        onRowSelected={getSelectedRow}
        columns={columns}
        rows={props.todos.map((elm) => {
          return {
            ...elm,
            createdAt: formatDateTime(elm.createdAt),
            updatedAt: formatDateTime(elm.updatedAt),
          };
        })}
      />
    );
  }

  if (props.loading) {
    data = <Spinner />;
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
      <Grid item xs={12} md={12} lg={12}>
        <Paper className={fixedHeightPaper}>
          <h1>Todos</h1>
          {errorMessage}
          {data}
        </Paper>
      </Grid>
      <AddButton handleAddButton={handleAdd} />
    </ContentView>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTodos: () => dispatch(actions.fetchTodo()),
    deleteTodo: (id) => dispatch(actions.deleteTodo(id)),
    onSelectTodo: (todo) => dispatch(actions.selectTodo(todo)),
  };
};
const mapStateToProps = (state) => {
  return {
    loading: state.todo.loading,
    error: state.todo.error,
    todos: state.todo.todos,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps // or put null here if you do not have actions to dispatch
)(TodosList);
