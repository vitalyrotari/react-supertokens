import { useLayoutEffect, ComponentType, ReactNode } from "react";

const FAKE_PASSWORD = "fakeUniqueSuperTokensRandomPass-sdfa452sadf342-24352";

function setInputValue(input: HTMLElement | null, value: string) {
  if (!input) {
    return;
  }

  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    "value"
  )?.set;

  if (nativeInputValueSetter) {
    nativeInputValueSetter.call(input, value);
  }

  const inputEvent = new Event("input", { bubbles: true });
  input.dispatchEvent(inputEvent);
}

function setInputText(input: HTMLElement | null, value: string) {
  if (input) {
    input.innerText = value;
  }
}

const hideElement = (node: HTMLElement | null) => {
  if (node) {
    node.style.display = "none";
  }
};

export interface SignUpPageProps {
  DefaultComponent: any;
  children?: ReactNode;
}

export function SignUpPage({
  DefaultComponent,
  ...props
}: SignUpPageProps) {
  // we use useLayoutEffect instead of useEffect because that prevent the UI glitch that
  // happens cause of the JS manipulation

  useLayoutEffect(() => {
    const shadowRoot = document.querySelector("#supertokens-root")?.shadowRoot;

    if (!shadowRoot) {
      return;
    }

    if (window.location.pathname.startsWith("/auth")) {
      // here we hide the password field..
      hideElement(shadowRoot.querySelector("form > div:nth-child(2)"));

      // we set the fake password in the password field so that the UI will
      // call the sign up API
      setInputValue(
        shadowRoot.querySelector("form > div:nth-child(2) > div > div > input"),
        FAKE_PASSWORD
      );
    } else {
      // we are in the /set-password page..

      // we hide everything except the password input component,
      // and we set the email to some random email.

      /* This is not the recommended way to build the set password form.
            But I did it here just to show what's possible. Instead, you should build your
            own form. */
      hideElement(shadowRoot.querySelector("form > div"));

      // we hide all the unnecessary UI components
      hideElement(shadowRoot.querySelector("div > div > div:nth-child(2)"));

      hideElement(shadowRoot.querySelector("div > div > div:nth-child(3)"));

      hideElement(shadowRoot.querySelector("div > div > div:nth-child(4)"));

      hideElement(shadowRoot.querySelector("form > div:nth-child(2) > div"));

      setInputText(shadowRoot.querySelector("div > div > div"), "Set Password");

      setInputText(
        shadowRoot.querySelector("form > div:nth-child(3) > button"),
        "CONTINUE"
      );

      // we put a fake email so that the sign up button can work
      setInputValue(
        shadowRoot.querySelector("form > div > div:nth-child(2) > div > input"),
        "a@b.com"
      );
    }
  }, []);

  return <DefaultComponent {...props} />;
}
