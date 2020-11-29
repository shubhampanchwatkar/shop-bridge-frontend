import React from "react";
import { Outlet } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

import SideDrawer from "../components/SideDrawer/SideDrawer";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: "flex",
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  wrapper: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    height: "100vh",
    boxSizing: "border-box",
  },
  contentContainer: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
  },
  content: {
    flex: "1 1 auto",
    height: "100%",
    overflow: "auto",
  },
}));

const InventoryPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <SideDrawer />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryPage;
