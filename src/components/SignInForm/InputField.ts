import { useEffect, useState } from "react";
import { FormField } from "./formField";

export default function Field(props: {
  formField: FormField<string>;
  children: (props: {
    value: string;
    touched: boolean;
    hasError: boolean;
    helpText: string;
    alertMessage: string;
    setValue: (value: string) => void;
    setTouched: (touched: boolean) => void;
  }) => JSX.Element;
}) {
  const { formField, children } = props;

  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const unsuscribeValue = formField.onValueChange(setValue);
    const unsuscribeTouched = formField.onTouchedChange(setTouched);
    const unsuscribeHasError = formField.onErrorChange(setHasError);
    return () => {
      unsuscribeValue();
      unsuscribeTouched();
      unsuscribeHasError();
    };
  }, []);

  return children({
    value,
    touched,
    hasError,
    helpText: formField.getHelpText(),
    alertMessage: formField.getAlertMessage(),
    setValue: formField.setValue,
    setTouched: formField.setTouched,
  });
}
