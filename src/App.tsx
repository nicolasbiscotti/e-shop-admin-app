import {
  configureFormField,
  validateEmail,
  validatePhoneNumber,
} from "./components/SignInForm/formField";
import SignInForm from "./components/SignInForm/SignInForm";

const emailField = configureFormField<string>({
  initialValue: "",
  helpText: "Email address",
  alertMessage: "user@example.com",
  validateFunction: validateEmail,
});

const passwordField = configureFormField<string>({
  initialValue: "",
  helpText: "Password",
  alertMessage: "more than four characters",
  validateFunction: (toValidate: string) => toValidate.length > 4,
});

const phoneNumber = configureFormField<string>({
  initialValue: "",
  helpText: "Phone number",
  alertMessage: "folllow the pattern (298)-987-5674",
  validateFunction: validatePhoneNumber,
});

function App() {
  return (
    <div className="App">
      <SignInForm
        email={emailField}
        password={passwordField}
        phone={phoneNumber}
      />
    </div>
  );
}

export default App;
