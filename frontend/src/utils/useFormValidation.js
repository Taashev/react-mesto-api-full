import { useCallback, useState } from "react";

const useFromValidation = () => {
  const [values, setValues] = useState({});
  const [errorMessages, setErrorMessages] = useState({});
  const [valid, setValid] = useState(false);

  const onChange = (e) => {
    const {name, value} = e.target;
    const formValidity = e.target.closest('form').checkValidity();

    setValues({...values, [name]: value});
    setErrorMessages({...errorMessages, [name]: e.target.validationMessage});
    setValid(formValidity);
  }

  const onBlur = (e) => {
    const {name} = e.target;
    const formValidity = e.target.closest('form').checkValidity();

    setErrorMessages({...errorMessages, [name]: e.target.validationMessage});
    setValid(formValidity);
  }

  const resetForm = ({newValues={}, newValid=false}) => {
    setValues(newValues);
    setErrorMessages({});
    setValid(newValid);
  }

  return {
    values,
    setValues,
    errorMessages,
    setErrorMessages,
    valid,
    setValid,
    onChange,
    onBlur,
    resetForm
  }
}

export default useFromValidation;
