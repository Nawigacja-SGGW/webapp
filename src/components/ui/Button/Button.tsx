import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
import './Button.scss';

export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonProps = {
  label: string;
  type?: 'button' | 'submit';
  size?: ButtonSize;
  primary?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = (props: ButtonProps) => {
  const { label, primary = false, size = 'md', className, type = 'button', disabled } = props;

  const buttonClassName: string = clsx('button', className, {
    ['primary']: primary,
    ['button-sm']: size === 'sm',
    ['button-md']: size === 'md',
    ['button-lg']: size === 'lg',
    ['disabled']: disabled,
  });

  return (
    <button className={buttonClassName} onClick={props.onClick} type={type} disabled={disabled}>
      {label}
    </button>
  );
};
