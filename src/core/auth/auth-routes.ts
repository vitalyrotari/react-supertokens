import * as ReactRouter from "react-router-dom";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import { ThirdPartyEmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/thirdpartyemailpassword/prebuiltui";
import { EmailVerificationPreBuiltUI } from "supertokens-auth-react/recipe/emailverification/prebuiltui";

export function getAuthRoutesForReactRouter() {
  return getSuperTokensRoutesForReactRouterDom(ReactRouter, [
    EmailVerificationPreBuiltUI,
    ThirdPartyEmailPasswordPreBuiltUI,
  ]);
}
