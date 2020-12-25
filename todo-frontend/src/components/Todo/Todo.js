import React from "react";
import ContentView from "../UI/ContentView/ContentView";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { green, lightBlue } from '@material-ui/core/colors';
import CachedIcon from '@material-ui/icons/Cached';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';



import { connect } from "react-redux";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
    textAlign: 'center'
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
  error: {
    border: "1px solid red",
    borderRadius: "4px",
    width: "50%",
    color: "red",
    padding: "15px",
    fontWeight: "bold",
  },
});

const Todo = (props) => {
  const classes = useStyles();

  const goToEdit = () => {
    props.history.push("editTodo");
  };
  return (
    <ContentView>
      {props.todo?.id ? (
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <Typography
              className={classes.title}
              component="h1"
              color="textSecondary"
              gutterBottom
            >
              {`${props.todo?.title}`}
            </Typography>
            <Typography variant="h5" component="h2">
              {props.todo?.description}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
            {props.todo?.status ? <CheckCircleIcon style={{ color: green[500] }}/> : <CachedIcon style={{ color: lightBlue[500] }} />}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
             <strong></strong> CreatedAt: {props.todo?.createdAt}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              Updated At: {props.todo?.updatedAt}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              color="primary"
              size="medium"
              style={{ margin: "5px auto" }}
              onClick={goToEdit}
            >
              Edit
            </Button>
          </CardActions>
        </Card>
      ) : (
        <p className={classes.error}>Select Todo First</p>
      )}
    </ContentView>
  );
};

const mapStateToProps = (state) => {
  return {
    todo: state.todo.selectedTodo,
  };
};

export default connect(mapStateToProps)(Todo);
