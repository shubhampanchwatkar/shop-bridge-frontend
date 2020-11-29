import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MuiDrawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AddIcon from "@material-ui/icons/Add";
import ListIcon from "@material-ui/icons/List";
import Typography from "@material-ui/core/Typography";

import { useNavigate } from "react-router-dom";
import { withRouter } from "../../hoc/withRouter";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: theme.props.drawerWidth,
    flexShrink: 0,
    display: "flex",
  },
  drawerPaper: {
    width: theme.props.drawerWidth,
    background: theme.palette.primary.main,
  },
  divider: {
    background: "#ffffff1c",
  },
  itemIcon: {
    minWidth: "35px",
  },
  drawerInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
  },
  drawericon: {
    color: "white",
  },
}));

const SideDrawer = ({ location }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const MenuItems = [
    {
      text: "Add Item",
      icon: <AddIcon className={classes.drawericon} fontSize="small" />,
      onClick: () => navigate("item"),
      path: "/app/item",
    },
    {
      text: "Items",
      icon: <ListIcon className={classes.drawericon} fontSize="small" />,
      onClick: () => navigate("item-list"),
      path: "/app/item-list",
    },
  ];

  return (
    <MuiDrawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <ListItem>
        <ListItemIcon>
          <AccountCircleIcon
            color="secondary"
            fontSize="large"
            className={classes.drawericon}
          />
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography variant="body2" style={{ color: "#ffffff" }}>
              Shubham Panchwatkar
            </Typography>
          }
        />
      </ListItem>
      <Divider className={classes.divider} />
      <List style={{ flex: 1 }}>
        {MenuItems.map((menuItem) => (
          <ListItem
            button
            key={menuItem.text}
            onClick={menuItem.onClick}
            selected={menuItem.path === location.pathname}
          >
            <ListItemIcon classes={{ root: classes.itemIcon }}>
              {menuItem.icon}
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="caption" style={{ color: "#ffffff" }}>
                  {menuItem.text}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
      <div className={classes.drawerInfo}>
        <Typography variant="body2" style={{ color: "#ffffff" }}>
          Shop Bridge
        </Typography>
        <Typography variant="body2" style={{ color: "#ffffff" }}>
          Inventory
        </Typography>
      </div>
    </MuiDrawer>
  );
};

export default withRouter(SideDrawer);
