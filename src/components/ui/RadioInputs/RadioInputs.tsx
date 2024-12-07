import { UseFormRegisterReturn } from 'react-hook-form';
import './RadioInputs.scss';

export type RadioInputsWrapperAttributes<T extends string> = {
  radioInputsValues: RadioInputAttributes[];
  registerOptions: UseFormRegisterReturn<T>;
};

export type RadioInputAttributes = {
  value: string;
  label: string;
  id: string;
};

export const RadioInputs = <T extends string>(attrs: RadioInputsWrapperAttributes<T>) => {
  return (
    <div>
      {attrs.radioInputsValues.map((radioInputValues) => (
        <div>
          <input
            id={radioInputValues.id}
            type="radio"
            value={radioInputValues.value}
            {...attrs.registerOptions}
          />
          <label htmlFor={radioInputValues.id}>{radioInputValues.label}</label>
        </div>
      ))}
    </div>
  );
};
