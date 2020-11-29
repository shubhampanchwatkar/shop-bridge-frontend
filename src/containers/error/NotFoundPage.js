import React from "react";
import { makeStyles } from "@material-ui/core";

import robot from "../../assets/images/robot.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#a6a6a6 !important",
    width: "100vw",
    height: "100vh",
  },
  errorBlock: {
    top: "50%",
    left: "50%",
    position: "absolute",
    transform: "translate(-50%, -50%)",
    width: "600px",
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#ffffff",
    boxShadow:
      "0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)",
  },
}));

const NotFoundPage = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.errorBlock}>
        <img src={robot} alt="robot" style={{ width: "210px" }} />
        <h1>404 - Resource not found</h1>
        <p>Sorry! we couldn't find the resource you are looking for.</p>
      </div>
    </div>
  );
};

export default NotFoundPage;
