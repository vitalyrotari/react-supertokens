import { useCallback, useEffect, useState } from "react";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { useNavigate } from "react-router-dom";
import { signOut } from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import { RealPasswordClaim } from "../../core/auth";

import reactLogo from "../../assets/react.svg";
import viteLogo from "/vite.svg";

export function HomePage() {
  const sessionContext = useSessionContext();
  const navigate = useNavigate();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (
      !sessionContext.loading &&
      sessionContext.invalidClaims.find(
        (err) => err.validatorId === RealPasswordClaim.id
      )
    ) {
      navigate("/set-password");
    }
  }, [sessionContext, navigate]);

  const handleLogout = useCallback(async () => {
    await signOut();
    navigate("/auth");
  }, [navigate]);

  if (sessionContext.loading || sessionContext.invalidClaims.length > 0) {
    return null;
  }

  return (
    <div className="fill">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
