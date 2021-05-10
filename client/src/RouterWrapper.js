// React Components
import { Route, Switch, Redirect } from "react-router-dom";

// Multilingual
import { withNamespaces } from "react-i18next";

// Material-UI
import { Container } from "@material-ui/core";

// ! Screens
// Forms
import RegisterTenancy from "./screens/RegisterTenancy";
import RegisterTenant from "./screens/RegisterTenant_RJ2/RegisterTenant";
import RegisterTenantCard from "./screens/RegisterTenantCard_RJ3/StripeHandlerComponent";
import RegisterTenantPM from "./screens/RegisterTenantPM_RJS/RegisterTenantPM";
// Approved
import ApprovedTenantRimbo from "./screens/approvedTenantRimbo/ApprovedTenantRimbo";
import ApprovedTenancyPM from "./screens/approvedTenancyPM/ApprovedTenancyPM";
import ApprovedTenantCardRimbo from "./screens/approvedTenantCardRimbo/ApprovedTenantCardRimbo";
import ApprovedTenancyRimbo from "./screens/approvedTenancyRimbo/ApprovedTenancyRimbo";
// Rejected
import RejectedTenantRimbo from "./screens/approvedTenantRimbo/RejectedTenantRimbo";
import RejectedTenancyPM from "./screens/approvedTenancyPM/RejectedTenancyPM";
// General
import Page404 from "./screens/404/404";

const RouterWrapper = () => {
  return (
    <>
      <Container maxWidth="xl">
        <Switch>
          <Route exact path="/register/tenancy" component={RegisterTenancy} />
          <Route
            exact
            path="/register/tenant/:tenancyID"
            component={RegisterTenant}
          />
          <Route
            exact
            path="/register/card/:randomID"
            component={RegisterTenantCard}
          />
          <Route
            exact
            path="/register/contract/:tenancyID"
            component={RegisterTenantPM}
          />
          <Route
            path="/register/tenant/:tenancyID/approved"
            component={ApprovedTenantRimbo}
          />
          <Route
            path="/register/tenant/:tenancyID/rejected"
            component={RejectedTenantRimbo}
          />
          <Route
            path="/register/tenancy/:tenancyID/pm/approved"
            component={ApprovedTenancyPM}
          />
          <Route
            path="/register/tenancy/:tenancyID/pm/rejected"
            component={RejectedTenancyPM}
          />
          <Route
            path="/register/card/:tenancyID/card/approved"
            component={ApprovedTenantCardRimbo}
          />

          <Route
            path="/register/contract/:tenancyID/service-start"
            component={ApprovedTenancyRimbo}
          />

          <Route path="/404" component={Page404} />
          <Redirect to="/404" />
        </Switch>
      </Container>
    </>
  );
};

export default withNamespaces()(RouterWrapper);
