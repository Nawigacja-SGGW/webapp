import Select, { OnChangeValue } from 'react-select';
import defaultProps from 'react-select';
import { useTranslation } from 'react-i18next';

type SelectDefaultProps = typeof defaultProps;

export interface SelectProps extends SelectDefaultProps {
  options: unknown[];
  value: unknown;
  onChange: (e: OnChangeValue<unknown, false>) => void;
  styles?: { control: (baseStyles: any, state: any) => any };
  placeholder?: string;
  isSearchable?: boolean;
  isClearable?: boolean;
  className?: string;
}

export const SelectComponent = (props: SelectProps) => {
  const { options, value, onChange, styles, placeholder, isSearchable, isClearable, className } =
    props;
  const { t } = useTranslation<string>();
  const placeholderValue = t(placeholder) ?? placeholder;

  return (
    <Select
      options={options}
      className={className}
      placeholder={placeholderValue}
      isSearchable={isSearchable}
      isClearable={isClearable}
      value={value}
      onChange={onChange}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          border: 'none',
          ...styles,
        }),
      }}
    />
  );
};

export default SelectComponent;
