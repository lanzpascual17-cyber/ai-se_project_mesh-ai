import { useState } from 'react';

type FormValues = Record<string, string>;
type FormErrors = Record<string, string>;

export function useFormWithValidation() {
  const [values, setValues] = useState<FormValues>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [isValid, setIsValid] = useState(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, validationMessage, form } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validationMessage }));
    setIsValid(form ? form.checkValidity() : false);
  }

  return { values, errors, isValid, handleChange };
}
