// React Components
import * as React from "react";
import { useState } from "react";

// Material-UI Components
import { Drawer, List, ListItem, ListItemText } from "@material-ui/core";
import { Menu } from "@material-ui/icons";

// Images
import SpanishLogo from "../../images/spanish-language.png";
import EnglishLogo from "../../images/english-language.png";

// Styles
import useStyles from "./styles";

// Multi language
import i18n from "../../i18n";

const SideDrawer = ({ navLinks }) => {
  const classes = useStyles();

  const [state, setState] = useState({ right: false });

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const spanish_logo = (
    <button
      onClick={() => changeLanguage("es")}
      className={classes.ToggleLanguageButton}
    >
      <img
        src={SpanishLogo}
        alt="Spanish language logo"
        className={classes.LanguageLogoMobile}
      />
    </button>
  );

  const english_logo = (
    <button
      onClick={() => changeLanguage("en")}
      className={classes.ToggleLanguageButton}
    >
      <img
        src={EnglishLogo}
        alt="English language logo"
        className={classes.LanguageLogoMobile}
      />
    </button>
  );

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ [anchor]: open });
  };

  const sideDrawerList = (anchor) => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {i18n.language === "es" ? (
        <List component="nav">
          {navLinks.map(({ title, path }) => (
            <a href={path} key={title} className={classes.linkTextMobile}>
              <ListItem>
                <ListItemText primary={title} />
              </ListItem>
            </a>
          ))}
          {english_logo}
        </List>
      ) : (
        <List component="nav">
          {navLinks.map(({ title, path }) => (
            <a href={path} key={title} className={classes.linkTextMobile}>
              <ListItem>
                <ListItemText primary={title} />
              </ListItem>
            </a>
          ))}
          {spanish_logo}
        </List>
      )}
    </div>
  );

  return (
    <React.Fragment>
      <b aria-label="menu" onClick={toggleDrawer("right", true)}>
        <Menu fontSize="large" style={{ color: `black` }} />
      </b>

      <Drawer
        anchor="right"
        open={state.right}
        // onOpen={toggleDrawer("right", true)}
        onClose={toggleDrawer("right", false)}
      >
        {sideDrawerList("right")}
      </Drawer>
    </React.Fragment>
  );
};

export default SideDrawer;
