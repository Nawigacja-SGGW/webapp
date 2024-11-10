import { forwardRef, InputHTMLAttributes } from 'react';
import './Input.scss';

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef((props: InputProps, ref) => {
  return <input className="input-container" {...props} ref={ref} />;
});
