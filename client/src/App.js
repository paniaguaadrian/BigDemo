// Multilingual
import { withNamespaces } from "react-i18next";

// App Routes
import RouterWrapper from "./RouterWrapper";

// Custom Components
import WhatsappBubble from "./components/WhatsappBubble/WhatsappBubble";
import NavBar from "./components/RimboNavBar/Header";
import Footer from "./components/Footer/Footer";

// Material-UI Theme
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

// Normalize & Generic styles
import "./styles/generic.scss";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#24c4c4",
      dark: "#1ea6a6",
      contrastText: "#fff",
    },
  },
});

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <NavBar />
      <WhatsappBubble />
      <RouterWrapper />
      <Footer />
    </MuiThemeProvider>
  );
};

export default withNamespaces()(App);
