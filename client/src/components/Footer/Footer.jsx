// React Components
import React from "react";

// Material Ui Icons
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";

// Images
import RimboLogoWhite from "../../images/rimbo_logo_white.png";
import SpanishLogo from "../../images/spanish-language.png";
import EnglishLogo from "../../images/english-language.png";

// Multi language
import { withNamespaces } from "react-i18next";
import i18n from "../../i18n";

// Styles imported
import classes from "./footer.module.scss";

const Footer = ({ t }) => {
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
        className={classes.LanguageLogo}
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
        className={classes.LanguageLogo}
      />
    </button>
  );

  return (
    <div className={classes.FooterContainer}>
      <div className={classes.FooterContent}>
        <div className={classes.FooterMain}>
          <a href="http://rimbo.rent" target="_blank" rel="noopener noreferrer">
            <img src={RimboLogoWhite} alt="Rimbo Rent Logo" />
          </a>
          <h4>{t("Footer.leftTitle")}</h4>
          <h4>{t("Footer.leftSubtitle")} </h4>
          <div className={classes.FooterSocialMedia}>
            <ul>
              <li>
                <a href="/" target="_blank" rel="noopener noreferrer">
                  <FacebookIcon className={classes.SocialMediaIcon} />
                </a>
              </li>
              <li>
                <a href="/" target="_blank" rel="noopener noreferrer">
                  <InstagramIcon className={classes.SocialMediaIcon} />
                </a>
              </li>
              <li>
                <a href="/" target="_blank" rel="noopener noreferrer">
                  <TwitterIcon className={classes.SocialMediaIcon} />
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* End of FooterMain */}

        <div className={classes.FooterSecond}>
          {i18n.language === "en" ? (
            <>
              <div className={classes.FooterLinks}>
                <h4>{t("Footer.rimbo")}</h4>
                <ul>
                  <a href="https://rimbo.rent/en/about-us/">
                    <li>{t("Footer.about")}</li>
                  </a>
                  <a href="https://rimbo.rent/en/tenants/">
                    <li>{t("Footer.tenants")}</li>
                  </a>
                  <a href="https://rimbo.rent/en/landlords/">
                    <li>{t("Footer.landlords")}</li>
                  </a>
                  <a href="https://rimbo.rent/en/agencies/">
                    <li>{t("Footer.agencies")}</li>
                  </a>
                  <a href="https://rimbo.rent/en/co-living/">
                    <li>{t("Footer.coliving")}</li>
                  </a>
                  <a href="https://rimbo.rent/en/pms-pmp-2/">
                    <li>{t("Footer.pmspmp")}</li>
                  </a>
                  <a href="https://rimbo.rent/en/news/">
                    <li>{t("Footer.news")}</li>
                  </a>
                </ul>
              </div>
              <div className={classes.FooterLinks}>
                <h4>{t("Footer.help")}</h4>
                <ul>
                  <a href="https://rimbo.rent/en/">
                    <li>{t("Footer.contact")}</li>
                  </a>
                  <a
                    href="mailto:info@rimbo.rent"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <li>info@rimbo.rent</li>
                  </a>
                  <div className={classes.LanguageContainer}>
                    <li>{spanish_logo}</li>
                    <li>{english_logo}</li>
                  </div>
                </ul>
              </div>
              <div className={classes.FooterLinks}>
                <h4>{t("Footer.legal")}</h4>
                <ul>
                  <a href="https://rimbo.rent/en/legal-notice/">
                    <li>{t("Footer.legalNotice")}</li>
                  </a>
                  <a href="https://rimbo.rent/en/privacy-policy/">
                    <li>{t("Footer.privacy")}</li>
                  </a>
                  <a href="https://rimbo.rent/en/cookies-policy/">
                    <li>{t("Footer.cookies")}</li>
                  </a>
                </ul>
              </div>
            </>
          ) : (
            <>
              <div className={classes.FooterLinks}>
                <h4>{t("Footer.rimbo")}</h4>
                <ul>
                  <a href="https://rimbo.rent/sobre-nosotros/">
                    <li>{t("Footer.about")}</li>
                  </a>
                  <a href="https://rimbo.rent/inquilinos-2/">
                    <li>{t("Footer.tenants")}</li>
                  </a>
                  <a href="https://rimbo.rent/propietarios/">
                    <li>{t("Footer.landlords")}</li>
                  </a>
                  <a href="https://rimbo.rent/inmobiliarias/">
                    <li>{t("Footer.agencies")}</li>
                  </a>
                  <a href="https://rimbo.rent/co-living-2/">
                    <li>{t("Footer.coliving")}</li>
                  </a>
                  <a href="https://rimbo.rent/pms-pmp/">
                    <li>{t("Footer.pmspmp")}</li>
                  </a>
                  <a href="https://rimbo.rent/noticias/">
                    <li>{t("Footer.news")}</li>
                  </a>
                </ul>
              </div>
              <div className={classes.FooterLinks}>
                <h4>{t("Footer.help")}</h4>
                <ul>
                  <a href="https://rimbo.rent/">
                    <li>{t("Footer.contact")}</li>
                  </a>
                  <a
                    href="mailto:info@rimbo.rent"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <li>info@rimbo.rent</li>
                  </a>
                  <div className={classes.LanguageContainer}>
                    <li>{spanish_logo}</li>
                    <li>{english_logo}</li>
                  </div>
                </ul>
              </div>
              <div className={classes.FooterLinks}>
                <h4>{t("Footer.legal")}</h4>
                <ul>
                  <a href="https://rimbo.rent/aviso-legal/">
                    <li>{t("Footer.legalNotice")}</li>
                  </a>
                  <a href="https://rimbo.rent/politica-privacidad/">
                    <li>{t("Footer.privacy")}</li>
                  </a>
                  <a href="https://rimbo.rent/politica-cookies/">
                    <li>{t("Footer.cookies")}</li>
                  </a>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
      {/* End FooterContent */}
      <div className={classes.FooterCopyContainer}>
        <p>{t("Footer.copyright")}</p>
      </div>
    </div>
    // End FooterContainer
  );
};

export default withNamespaces()(Footer);
