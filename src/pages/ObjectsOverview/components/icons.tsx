import { CheckboxChecked } from '@styled-icons/boxicons-solid/CheckboxChecked';
import { Checkbox } from '@styled-icons/boxicons-solid/Checkbox';

export const CheckboxIcon = ({ checked }: { checked: boolean }) =>
  checked ? (
    <CheckboxChecked size={35} style={{ color: 'var(--gray)' }} />
  ) : (
    <Checkbox size={35} style={{ color: 'var(--gray)' }} />
  );
