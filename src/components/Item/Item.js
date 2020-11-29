import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert/Alert";

import { addItemData } from "../../store/actions";
import { withRouter } from "../../hoc/withRouter";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    background: "#ffffff",
    borderRadius: 5,
    marginTop: 25,
    marginBottom: 25,
  },
};

const minLengthValidator = (minLength) => {
  return (value) => {
    if (value.length < minLength)
      return { showError: true, errorMsg: undefined };
    return { showError: false, errorMsg: undefined };
  };
};

class Item extends Component {
  constructor(props) {
    super(props);

    this.fields = {
      name: {
        validator: minLengthValidator(3),
        minLength: 1,
        maxLength: 64,
      },
      price: {
        validator: minLengthValidator(1),
        minLength: 1,
        maxLength: 20,
        regex: /^\d*$/,
      },
      description: {
        validator: minLengthValidator(1),
        minLength: 1,
        maxLength: 1024,
      },
    };

    this.state = {
      name: { value: "" },
      price: { value: "" },
      description: { value: "" },
    };

    this.nameRef = React.createRef();
  }

  componentDidMount() {
    this.nameRef.current.focus();
  }

  handleChange(field, event) {
    const { value } = event.target;
    const { maxLength, regex } = this.fields[field];

    if (regex && !regex.test(value)) return;
    if (value.length > maxLength) return;
    this.setState({
      [field]: { value, showError: false, errorMsg: undefined },
    });
  }

  handleBlur(field, event) {
    const { value } = event.target;
    if (!this.validate(field, value)) event.preventDefault();
  }

  validate(field, value) {
    const { showError, errorMsg } = this.fields[field].validator(value);
    this.setState({ [field]: { value, showError, errorMsg } });
    return !showError;
  }

  submitProductForm() {
    let invalidForm = false;
    for (const field in this.fields) {
      if (!this.validate(field, this.state[field].value)) invalidForm = true;
    }

    if (invalidForm) return;
    const { dispatch, navigate } = this.props;
    const { name, price, description } = this.state;
    const form = {
      name: name.value,
      price: price.value,
      description: description.value,
    };
    dispatch(addItemData(form, navigate));
  }

  render() {
    const { classes, addItemRedirecting, addItemRedirectError } = this.props;
    const { name, price, description } = this.state;
    return (
      <Container maxWidth="md">
        <Grid container spacing={2} className={classes.container}>
          <Grid item xs={12}>
            <Typography
              variant="body1"
              color="primary"
              style={{ marginTop: "10px" }}
            >
              Add Item In Inventory
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {addItemRedirectError ? (
              <Alert severity="error">{addItemRedirectError}</Alert>
            ) : null}
          </Grid>
          <Grid item xs={8} container spacing={2}>
            <Grid item sm={12} md={8}>
              <TextField
                id="name"
                label="Name"
                fullWidth
                value={name.value}
                error={name.showError}
                helperText={name.errorMsg}
                onChange={(e) => this.handleChange("name", e)}
                onBlur={(e) => this.handleBlur("name", e)}
                inputRef={this.nameRef}
              />
            </Grid>
            <Grid item sm={12} md={4}>
              <FormControl fullWidth error={price.showError}>
                <InputLabel htmlFor="price">Price</InputLabel>
                <Input
                  id="price"
                  value={price.value}
                  onChange={(e) => this.handleChange("price", e)}
                  onBlur={(e) => this.handleBlur("price", e)}
                  startAdornment={
                    <InputAdornment position="start">Rs</InputAdornment>
                  }
                />
                <FormHelperText id="component-error-text">
                  {price.errorMsg}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item sm={12}>
              <TextField
                id="description"
                label="Description"
                multiline
                fullWidth
                rows={4}
                value={description.value}
                error={description.showError}
                helperText={description.errorMsg}
                onChange={(e) => this.handleChange("description", e)}
                onBlur={(e) => this.handleBlur("description", e)}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="outlined"
              color="primary"
              style={{ margin: "10px 0" }}
              size="large"
              disabled={addItemRedirecting}
              onClick={() => this.submitProductForm()}
            >
              Add Product
            </Button>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = ({ itemReducer }) => itemReducer;

export default withStyles(styles)(connect(mapStateToProps)(withRouter(Item)));
