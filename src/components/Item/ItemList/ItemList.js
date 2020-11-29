import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Alert from "@material-ui/lab/Alert/Alert";

import { fetchItems, deleteItem } from "../../../store/actions";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 25,
    marginBottom: 25,
  },
  table: {
    width: "100%",
  },
};

class ItemList extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchItems());
  }

  handleDeleteItem(itemId) {
    if (
      !window.confirm("You are about to delete item. Do you want to proceed?")
    )
      return;
    const { dispatch } = this.props;
    dispatch(deleteItem(itemId));
  }

  render() {
    const { isLoading, items, itemsError, classes } = this.props;
    return (
      <Container fixed>
        <Grid container spacing={2} className={classes.container}>
          <Grid item xs={12}>
            <Typography
              variant="body1"
              color="primary"
              style={{ marginTop: "10px" }}
            >
              List Of items
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {itemsError ? <Alert severity="error">{itemsError}</Alert> : null}
          </Grid>
          <Grid item xs={12}>
            {isLoading ? (
              <CircularProgress />
            ) : items.length > 0 ? (
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Price&nbsp;(Rs)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell component="th" scope="row">
                          {item.name}
                        </TableCell>
                        <TableCell>{item.description}</TableCell>
                        <TableCell align="right">{item.price}</TableCell>
                        <TableCell>
                          <IconButton
                            aria-label="delete"
                            onClick={() => this.handleDeleteItem(item.id)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : null}
          </Grid>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = ({ itemReducer }) => itemReducer;

export default withStyles(styles)(connect(mapStateToProps)(ItemList));
