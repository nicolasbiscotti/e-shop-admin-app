import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Options } from "@testing-library/user-event/dist/types/options";
import Field from "./InputField";
import createField from "./InputFieldLayout";
import { configureFormField, FormField, validateEmail } from "./formField";

function setup(
  ui: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
  options?: Options
) {
  return {
    adminUser: userEvent.setup(options),
    ...render(ui),
  };
}

describe("Validate Form Field Use Case", () => {
  it("should set the field value with valid data.", async () => {
    const emailField = configureFormField({
      initialValue: "",
      helpText: "Email address",
      alertMessage:
        "Pleas enter a valid email format, such as name@example.com",
      validateFunction: validateEmail,
    });

    const { adminUser, getByRole } = setup(
      <Field formField={emailField}>
        {createField({ type: "email" })}
      </Field>
    );

    const emailInput = getByRole("textbox", { name: "Email address" });

    expect(emailInput).toHaveValue("");

    await adminUser.click(emailInput);
    await adminUser.keyboard("nico");
    expect(emailInput).toHaveValue("nico");
    expect(emailInput).toHaveClass("red");

    await adminUser.keyboard("@gmail.com");
    expect(emailInput).toHaveValue("nico@gmail.com");
    expect(emailInput).not.toHaveClass("red");
  });

  it("should displays the alert message until the minimum requirement are meet", async () => {
    const alertMessage =
      "Pleas enter a valid email format, such as name@example.com";
    const emailField = configureFormField({
      initialValue: "",
      helpText: "Email address",
      alertMessage,
      validateFunction: validateEmail,
    });

    const { adminUser, getByRole, queryByRole } = setup(
      <Field formField={emailField}>
        {createField({ type: "email" })}
      </Field>
    );

    const emailInput = getByRole("textbox", { name: "Email address" });

    expect(
      queryByRole("alert", { description: alertMessage })
    ).not.toBeInTheDocument();

    await adminUser.click(emailInput);
    await adminUser.keyboard("leo2022");
    expect(
      queryByRole("alert", { description: alertMessage })
    ).not.toBeInTheDocument();

    await adminUser.tab();
    expect(
      getByRole("alert", { description: alertMessage })
    ).toBeInTheDocument();

    await adminUser.click(emailInput);
    await adminUser.keyboard("@gmail.com");
    expect(
      queryByRole("alert", { description: alertMessage })
    ).not.toBeInTheDocument();
  });
});
