export default function createField(config: {
  type: "email" | "password" | "tel";
  styles?: {
    rounded?: "top" | "bottom";
  };
}) {
  const { type, styles } = config;
  const rounded = (function () {
    let result = "rounded-lg";
    if (styles?.rounded === "top") {
      result = "rounded-t-lg";
    } else if (styles?.rounded === "bottom") {
      result = "rounded-b-lg";
    }
    return result;
  })();
  return function (props: {
    value: string;
    touched: boolean;
    hasError: boolean;
    helpText: string;
    alertMessage: string;
    setValue: (value: string) => void;
    setTouched: (touched: boolean) => void;
  }) {
    const {
      value,
      touched,
      hasError,
      helpText,
      alertMessage,
      setValue,
      setTouched,
    } = props;
    return (
      <div className="flex min-w-full flex-col items-stretch">
        <label className="relative">
          <input
            type={type}
            name={type}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={() => setTouched(true)}
            className={`${
              hasError
                ? "red text-red-900/80 bg-red-200 border-red-400 focus:border-red-600 focus:ring-red-600"
                : "border-gray-300"
            } ${`${rounded} min-w-full py-2 pl-2 text-gray-900/80 text-lg border sm:text-base`}`}
          />
          <span
            className={`${value ? "invisible" : "visible"} ${
              hasError ? "text-red-900/80" : "text-gray-500/80"
            } absolute inset-0 py-2 pl-2 text-lg  sm:text-base`}
          >
            {helpText}
          </span>
        </label>
        {hasError && touched ? (
          <div
            role="alert"
            aria-describedby={`${type}-alert-message`}
            className="px-2"
          >
            <p id={`${type}-alert-message`} className="text-red-800 text-right">
              {alertMessage}
            </p>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  };
}
// function createEmailField(props: {
//   value: string;
//   touched: boolean;
//   hasError: boolean;
//   helpText: string;
//   alertMessage: string;
//   setValue: (value: string) => void;
//   setTouched: (touched: boolean) => void;
// }) {
//   const {
//     value,
//     touched,
//     hasError,
//     helpText,
//     alertMessage,
//     setValue,
//     setTouched,
//   } = props;
//   return (
//     <div className="flex min-w-full flex-col items-stretch">
//       <label className="relative">
//         <input
//           type="email"
//           name="email"
//           value={value}
//           onChange={(e) => setValue(e.target.value)}
//           onBlur={() => setTouched(true)}
//           className={`${
//             hasError
//               ? "text-red-900/80 bg-red-200 border-red-400 focus:border-red-600 focus:ring-red-600"
//               : "border-gray-300"
//           } ${`rounded-t-lg min-w-full py-2 pl-2 text-gray-900/80 text-lg border sm:text-base`}`}
//         />
//         <span
//           className={`${value ? "invisible" : "visible"} ${
//             hasError ? "text-red-900/80" : "text-gray-500/80"
//           } absolute inset-0 py-2 pl-2 text-lg  sm:text-base`}
//         >
//           {helpText}
//         </span>
//       </label>
//       {hasError && touched ? (
//         <div
//           role="alert"
//           aria-describedby="email-alert-message"
//           className="px-2"
//         >
//           <p id="email-alert-message" className="text-red-800 text-right">
//             {alertMessage}
//           </p>
//         </div>
//       ) : (
//         ""
//       )}
//     </div>
//   );
// }
