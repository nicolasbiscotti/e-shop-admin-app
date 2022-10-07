import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Options } from "@testing-library/user-event/dist/types/options";
import React, { useEffect, useState } from "react";
import { configureEmailField, FormField } from "./validateField";

function setup(
  ui: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
  options?: Options
) {
  return {
    adminUser: userEvent.setup(options),
    ...render(ui),
  };
}

function EmailField(props: {
  emailField: FormField<string>;
  children: (props: {
    value: string;
    hasError: boolean;
    helpText: string;
    setEmail: (value: string) => void;
  }) => JSX.Element;
}) {
  const { emailField, children } = props;

  const [value, setValue] = useState("");
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const unsuscribeValue = emailField.onValueChange(setValue);
    const unsuscribeHasError = emailField.onErrorChange(setHasError);
  }, []);

  return children({
    value,
    hasError,
    helpText: emailField.getHelpText(),
    setEmail: emailField.setValue,
  });
}

const createEmailField = (props: {
  value: string;
  hasError: boolean;
  helpText: string;
  setEmail: (value: string) => void;
}) => {
  const { value, hasError, helpText, setEmail } = props;
  return (
    <div>
      <label>
        <input
          type="email"
          name="email"
          value={value}
          onChange={(e) => setEmail(e.target.value)}
          className={`${hasError ? "red" : ""}`}
        />
        <span>{helpText}</span>
      </label>
      {/* <div role="alert" aria-describedby="email-alert-message">
        <p id="email-alert-message">{emailField.getAlertMessage()}</p>
      </div> */}
    </div>
  );
};

describe("Validate Form Field Use Case", () => {
  it("should set the field value with valid data.", async () => {
    const emailField = configureEmailField({
      initialValue: "",
      helpText: "Email address",
      alertMessage: "Pleas enter a valid email address.",
    });

    const { adminUser, getByRole } = setup(
      <EmailField emailField={emailField}>{createEmailField}</EmailField>
    );

    const emailInput = getByRole("textbox", { name: "Email address" });

    expect(emailInput).toHaveValue("");

    await adminUser.click(emailInput);
    await adminUser.keyboard("nico");
    expect(emailInput).toHaveValue("nico");
    expect(emailInput).toHaveClass("red");

    await adminUser.keyboard("@gmail.com");
    expect(emailInput).toHaveValue("nico@gmail.com");
    expect(emailInput).not.toHaveClass();

    // let alertMessage = queryByRole("alert", {
    //   description: "Pleas enter a valid email address.",
    // });
    // expect(alertMessage).not.toBeInTheDocument();
    // expect(
    //   queryByRole("alert", {
    //     description: "Pleas enter a valid email address.",
    //   })
    // ).toBeInTheDocument();
  });
});
