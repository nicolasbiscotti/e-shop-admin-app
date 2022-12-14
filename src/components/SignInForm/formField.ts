export interface FormField<T> {
  onValueChange: (listener: (value: T) => void) => () => void;
  onTouchedChange: (listener: (touched: boolean) => void) => () => void;
  onErrorChange: (listener: (hasError: boolean) => void) => () => void;
  getHelpText: () => string;
  getAlertMessage: () => string;
  setValue: (value: T) => void;
  setTouched: (touched: boolean) => void;
}

type FormFieldConfig<T> = {
  initialValue: T;
  helpText: string;
  alertMessage: string;
  validateFunction: (toValidate: T) => boolean;
};

function configureFormField<T>(config: FormFieldConfig<T>): FormField<T> {
  const state = {
    value: config.initialValue,
    helpText: config.helpText,
    alertMessage: config.alertMessage,
    touched: false,
    error: false,
  };

  const valueListeners: Set<(value: T) => void> = new Set();
  const touchedListeners: Set<(touched: boolean) => void> = new Set();
  const errorListeners: Set<(hasError: boolean) => void> = new Set();

  function onValueChange(listener: (value: T) => void) {
    valueListeners.add(listener);
    listener(state.value);
    return () => valueListeners.delete(listener);
  }

  function onTouchedChange(listener: (touched: boolean) => void) {
    touchedListeners.add(listener);
    listener(state.touched);
    return () => touchedListeners.delete(listener);
  }

  function onErrorChange(listener: (hasError: boolean) => void) {
    errorListeners.add(listener);
    listener(state.error);
    return () => errorListeners.delete(listener);
  }

  function getHelpText() {
    return state.helpText;
  }

  function getAlertMessage() {
    return state.alertMessage;
  }

  function setValue(value: T) {
    state.value = value;
    valueListeners.forEach((listener) => listener(state.value));
    validate(state.value);
  }

  function setTouched(touched: boolean) {
    state.touched = touched;
    touchedListeners.forEach((listener) => listener(state.touched));
  }

  function validate(value: T) {
    const invalidValue = !config.validateFunction(value);

    if (invalidValue) {
      if (!state.error) setError(true);
    } else if (state.error) {
      setError(false);
    }
  }

  function setError(error: boolean) {
    state.error = error;
    errorListeners.forEach((listener) => listener(state.error));
  }

  return {
    onValueChange,
    onTouchedChange,
    onErrorChange,
    getHelpText,
    getAlertMessage,
    setValue,
    setTouched,
  };
}

function validateEmail(toValidate: string): boolean {
  const emailRegex = /^[\w.-]{1,}@{1}(?:[\w-]{1,}[.]{1}){1,2}[\w]{2,}$/;
  return emailRegex.test(toValidate);
}

function validatePhoneNumber(toValidate: string): boolean {
  const phoneRegex = /^(?:\d{3}|\(\d{3}\))([-/.])\d{3}\1\d{4}$/;
  return phoneRegex.test(toValidate);
}

export { configureFormField, validateEmail, validatePhoneNumber };
// regex to describe the set of possible strings representing emails
// 1) the begining of the line of data: ^
// 2) followed by one or more alphanumeric charaters, dots or -: [\w.-]+
// 3) followed by one @.
// 4) followed by one or two non-capturing group of one or more alphnumeric character,
//    dots or - followed by one dot: (?:[\w\-]{1,}[.]{1}){1,2}
// 5) followed by two or more alphanumeric characters
// 6) folowed by the end of the line of data: $
// the result regex --> /^[\w.-]{1,}@{1}(?:[\w\-]{1,}[.]{1}){1,2}[\w]{2,}$/

// regex to describe the set of possible strings representing phone numbers
// 1) the beginning of the line of data: ^
// 2) followed by three numeric characters \d{3} OR | a left parenthesis \(,
//    followed by three digits \d{3}, followed by a close parenthesis \),
//    in a non-capturing group (?:)
// 3) followed by one dash, forward slash, or decimal point in a capturing group ()
// 4) followed by three digits \d{3}
// 5) followed by the match remembered in the (first) captured group \1
// 6) followed by four digits \d{4}
// 7) followed by the end of the line of data: $
// the result regex --> /^(?:\d{3}|\(\d{3}\))([-/.])\d{3}\1\d{4}$/
