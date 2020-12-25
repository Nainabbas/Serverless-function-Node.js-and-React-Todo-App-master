import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';

import AssignmentIcon from '@material-ui/icons/Assignment';

import { NavLink } from "react-router-dom";

export const MainListItems = (props) => (
  <div>
      <NavLink
        style={{ color: "rgba(0, 0, 0, 0.87)", textDecoration: "none" }}
        to={"/todos"}
      >
        <ListItem button>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Todos" />
        </ListItem>
      </NavLink>
  </div>
);

export const SecondaryListItems = (props) => (
  <div>
      <NavLink
        style={{ color: "rgba(0, 0, 0, 0.87)", textDecoration: "none" }}
        to={"/addTodo"}
      >
        <ListItem button>
          <ListItemIcon>
            <PlaylistAddIcon />
          </ListItemIcon>
          <ListItemText primary="Add Todo" />
        </ListItem>
      </NavLink>
  </div>
);
