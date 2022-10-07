import React, { useReducer } from "react";
type Values = { email: string; password: string };
type Action = { type: string; payload: string };

type Touched = { email: boolean; password: boolean };

type Errors = { email: string; password: string };

function setEmail(email: string): Action {
  return {
    type: "setEmail",
    payload: email,
  };
}
function setPassword(password: string): Action {
  return {
    type: "setPassword",
    payload: password,
  };
}

function valuesReducer(values: Values, action: Action) {
  switch (action.type) {
    case "setEmail":
      return { ...values, email: action.payload };
    case "setPassword":
      return { ...values, password: action.payload };
    default:
      return values;
  }
}

function touchReducer(touched: Touched, action: { type: string }) {
  switch (action.type) {
    case "emailTouched":
      return { ...touched, email: true };
    case "passwordTouched":
      return { ...touched, password: true };
    default:
      return touched;
  }
}

function errorReducer(errors: Errors, action: Action) {
  switch (action.type) {
    case "setEmailError":
      return { ...errors, email: action.payload };
    case "setPasswordError":
      return { ...errors, password: action.payload };
    default:
      return errors;
  }
}

export default function SignInForm() {
  const [values, valuesDispatch] = useReducer(valuesReducer, {
    email: "",
    password: "",
  });
  const [touched, touchDispatch] = useReducer(touchReducer, {
    email: false,
    password: false,
  });
  const [errors, errorDispatch] = useReducer(errorReducer, {
    email: "",
    password: "",
  });

  function handleValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    if (name === "email") {
      valuesDispatch(setEmail(value));
      if (value.length <= 4 && !errors.email) {
        errorDispatch({
          type: "setEmailError",
          payload: "complete with a valid email",
        });
      } else if (value.length > 4 && errors.email) {
        errorDispatch({
          type: "setEmailError",
          payload: "",
        });
      }
    } else if (name === "password") {
      valuesDispatch(setPassword(value));
      if (value.length <= 4 && !errors.password) {
        errorDispatch({
          type: "setPasswordError",
          payload: "password must be longer that",
        });
      } else if (value.length > 4 && errors.password) {
        errorDispatch({
          type: "setPasswordError",
          payload: "",
        });
      }
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-end bg-gray-50 px-2.5 pb-8 sm:justify-center">
      <div className="w-full max-w-md space-y-4">
        <div>
          <img src="" alt="" />

          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>

          <p className="mt-2 text-center text-sm text-gray-600">
            Or
            <a
              className="font-medium text-indigo-600 hover:text-indigo-500"
              href="#"
            >
              try a free version
            </a>
          </p>
        </div>

        <form
          action="#"
          className="flex min-w-full flex-col items-stretch gap-1"
        >
          <Label
            name="email"
            placeholder="Email address"
            value={values.email}
            onChange={handleValueChange}
            onBlur={() => touchDispatch({ type: "emailTouched" })}
            rounded="top"
            error={touched.email && errors.email !== ""}
          />
          <Label
            name="password"
            placeholder="Password"
            value={values.password}
            onChange={handleValueChange}
            onBlur={() => touchDispatch({ type: "passwordTouched" })}
            rounded="bottom"
            error={touched.password && errors.password !== ""}
          />

          <button
            className="text-lg mt-10 rounded-lg bg-sky-800 p-2 text-center font-medium text-gray-100"
            type="submit"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

function Label(props: {
  value: string;
  name: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  rounded?: string;
  error: boolean;
}) {
  let {
    value,
    name,
    placeholder,
    onChange,
    onBlur,
    rounded = "",
    error,
  } = props;
  let borderColor = "border-gray-300";
  if (error) {
    borderColor = "border-red-700";
  }

  if (rounded === "bottom") {
    rounded = "rounded-b-lg";
  } else if (rounded === "top") {
    rounded = "rounded-t-lg";
  } else {
    rounded = "rounded-lg";
  }

  const invisible = value ? "invisible" : "visible";

  return (
    <label className="relative">
      <input
        className={`min-w-full ${rounded} py-2 pl-2 text-lg border ${borderColor} sm:text-base`}
        type={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      <span
        className={`${invisible} absolute inset-0 py-2 pl-2 text-lg text-gray-500/80 sm:text-base`}
      >
        {placeholder}
      </span>
    </label>
  );
}
