import { useState } from 'react';

export default function useFormInput(initialValue = {}) {
  let [inputs, setInputValues] = useState(initialValue);

  function handleInputChange(e) {
    setInputValues({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  }

  return [inputs, setInputValues, handleInputChange];
}
