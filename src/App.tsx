import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import Session, { SessionAuth } from "supertokens-auth-react/recipe/session";
import EmailVerification from "supertokens-auth-react/recipe/emailverification";
import ThirdPartyEmailPassword, {
  Google,
  Apple,
  ThirdpartyEmailPasswordComponentsOverrideProvider,
} from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { RealPasswordClaim, getAuthRoutesForReactRouter } from "./core/auth";
import { HomePage } from "./pages/Home";
// import { SetPasswordPage } from "./pages/SetPassword";
import { SignUpPage } from "./pages/SignUp";
import "./App.css";

const REACT_APP_API_URL = "http://localhost:8000";
const REACT_APP_WEBSITE_URL = "http://localhost:5173";

SuperTokens.init({
  appInfo: {
    appName: "SuperTokens Demo App",
    apiDomain: REACT_APP_API_URL,
    websiteDomain: REACT_APP_WEBSITE_URL,
    apiBasePath: "/auth",
    websiteBasePath: "/auth",
  },
  recipeList: [
    EmailVerification.init({
      mode: "REQUIRED",
    }),
    ThirdPartyEmailPassword.init({
      signInAndUpFeature: {
        providers: [Google.init(), Apple.init()],
      },
      // getRedirectionURL: async function (context) {
      //   if (context.action === "SUCCESS") {
      //     // this is called after sign up / in and after email is verified
      //     const accessTokenPayload =
      //       await Session.getAccessTokenPayloadSecurely();

      //     if (
      //       RealPasswordClaim.getValueFromPayload(accessTokenPayload) !== true
      //     ) {
      //       return "/set-password?show=signup"; // we ask the user to set their password now
      //     }
      //   }
      // },
    }),
    Session.init({
      override: {
        functions: (oI) => {
          return {
            ...oI,
            getGlobalClaimValidators: (input) => [
              ...input.claimValidatorsAddedByOtherRecipes,
              // RealPasswordClaim.validators.isTrue(),
            ],
          };
        },
      },
    }),
  ],
});

function App() {
  return (
    <SuperTokensWrapper>
      <ThirdpartyEmailPasswordComponentsOverrideProvider
        components={{
          ThirdPartySignInAndUpProvidersForm_Override: ({
            DefaultComponent,
            ...props
          }) => {
            console.log('ThirdPartySignInAndUpProvidersForm_Override', {
              DefaultComponent,
              ...props,
            });

            if (window.location.pathname === "/set-password") {
              return null;
            }

            console.log('ewewwew');

            return <DefaultComponent {...props} />;
          },
          EmailPasswordSignUpForm_Override: (props) => (
            <SignUpPage {...props} />
          ),
        }}
      />
      <Router>
        <Routes>
          {getAuthRoutesForReactRouter()}
          <Route
            path="/"
            element={
              /* This protects the "/" route so that it shows 
                                    <Home /> only if the user is logged in.
                                    Else it redirects the user to "/auth" */
              <SessionAuth
                onSessionExpired={() => {
                  toast("Session Expired. Please login again");
                  // updateShowSessionExpiredPopup(true);
                }}
              >
                <HomePage />
              </SessionAuth>
            }
          />
          {/* <Route
            path="/set-password"
            element={
              <SessionAuth>
                <SetPasswordPage />
              </SessionAuth>
            }
          /> */}
        </Routes>
      </Router>
      <Toaster />
    </SuperTokensWrapper>
  );
}

export default App;
