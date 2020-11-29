import { createMuiTheme, colors } from "@material-ui/core";

const shopBridgeBlue = "#293c7a";
const shopBridgeSkyBlue = "#00b0ff";

export default createMuiTheme({
  palette: {
    background: {
      dark: "#F4F6F8",
      default: colors.common.white,
      paper: colors.common.white,
    },
    primary: {
      main: shopBridgeBlue,
    },
    secondary: {
      main: shopBridgeSkyBlue,
    },
  },
  typography: {
    fontSize: 16,
  },
  props: {
    drawerWidth: 250,
  },
});
