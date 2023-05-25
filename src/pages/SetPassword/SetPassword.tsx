import { useEffect } from "react";
import { SignInAndUp } from "supertokens-auth-react/recipe/thirdpartyemailpassword/prebuiltui";

export function SetPasswordPage() {
  useEffect(() => {
    // This block is only necessary cause I am reusing <SignInAndUp />
    const urlParams = new URLSearchParams(window.location.search);
    const show = urlParams.get("show");

    if (show === null) {
      urlParams.set("show", "signup");
      window.location.search = urlParams.toString();
      return;
    }
  }, []);

  return <SignInAndUp redirectOnSessionExists={false} />;
}
