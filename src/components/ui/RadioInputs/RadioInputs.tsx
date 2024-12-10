import { UseFormRegisterReturn } from 'react-hook-form';
import './RadioInputs.scss';

export type RadioInputsWrapperAttributes<T extends string> = {
  radioInputsValues: RadioInputAttributes[];
  registerOptions: UseFormRegisterReturn<T>;
  defaultValue: T;
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
        <div key={radioInputValues.id} className="radio-container">
          <input
            id={radioInputValues.id}
            type="radio"
            value={radioInputValues.value}
            {...attrs.registerOptions}
            className="radio-input"
            defaultChecked={radioInputValues.value === attrs.defaultValue}
          />
          <label htmlFor={radioInputValues.id} className="radio-label">
            {radioInputValues.label}
          </label>
        </div>
      ))}
    </div>
  );
};
