import React, { useReducer } from "react";
type State = { email: string; password: string };
type Action = { type: string; payload: string };

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

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "setEmail":
      return { ...state, email: action.payload };
    case "setPassword":
      return { ...state, password: action.payload };

    default:
      return state;
  }
}

export default function SignInForm() {
  const [state, dispatch] = useReducer(reducer, { email: "", password: "" });

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
            value={state.email}
            onChange={(e) => dispatch(setEmail(e.target.value))}
            rounded="top"
          />
          <Label
            name="password"
            placeholder="Password"
            value={state.password}
            onChange={(e) => dispatch(setPassword(e.target.value))}
            rounded="bottom"
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
  rounded?: string;
}) {
  let { value, name, placeholder, onChange, rounded = "" } = props;

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
        className={`min-w-full ${rounded} py-2 pl-2 text-lg ring-0 sm:text-base`}
        type={name}
        name={name}
        value={value}
        onChange={onChange}
      />
      <span
        className={`${invisible} absolute inset-0 py-2 pl-2 text-lg text-gray-500/80 sm:text-base`}
      >
        {placeholder}
      </span>
    </label>
  );
}
