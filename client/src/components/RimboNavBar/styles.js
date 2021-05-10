import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  // General
  AppBarContainer: {
    backgroundColor: `white`,
  },

  NavBarContainer: {
    display: `flex`,
    justifyContent: `space-between`,
    alignItems: `center`,
    padding: `.5rem 1rem`,
  },

  Logo: {
    height: `3rem`,
  },

  LinksListContainer: {
    display: `flex`,
    justifyContent: `space-between`,
    alignItems: `center`,
  },

  LinkText: {
    textDecoration: `none`,
    color: `black`,
    transition: `all .25s ease-in-out`,
    "&:hover": {
      color: `#6aa3a1`,
    },
  },

  // Multilingual
  LanguageLogo: {
    height: `1.3rem`,
  },

  ToggleLanguageButton: {
    background: `none !important`,
    border: `none`,
    backgroundColor: `none !important`,
    width: `3rem !important`,
    margin: `0 auto`,
  },

  // SideDrawer Component (Mobile)
  LanguageLogoMobile: {
    height: `2.5rem`,
    marginLeft: `1.8rem`,
    marginTop: `4rem`,
  },

  list: {
    width: 250,
    height: `100%`,
    backgroundColor: `#042040`,
  },

  linkTextMobile: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    color: `white`,
  },
});

export default useStyles;
