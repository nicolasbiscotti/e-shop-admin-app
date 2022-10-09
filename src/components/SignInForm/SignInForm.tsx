import Field from "./InputField";
import createField from "./InputFieldLayout";
import { FormField } from "./formField";

export default function SignInForm(props: {
  email: FormField<string>;
  password: FormField<string>;
  phone: FormField<string>;
}) {
  const { email, password, phone } = props;

  return (
    <div className="flex min-h-screen flex-col items-center justify-end bg-gray-50 px-2.5 pb-8 sm:justify-center">
      <div className="w-full max-w-md space-y-4">
        <div>
          <img src="" alt="" />

          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>

          <p className="mt-2 text-center text-sm text-gray-600">
            {`Or `}
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
          <Field formField={email}>{createField({ type: "email" })}</Field>
          <Field formField={phone}>{createField({ type: "tel" })}</Field>
          <Field formField={password}>
            {createField({ type: "password" })}
          </Field>

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
