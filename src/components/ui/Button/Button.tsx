import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
import './Button.scss';

export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonProps = {
  primary?: boolean;
  label: string;
  size?: ButtonSize;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = (props: ButtonProps) => {
  const { label, primary = false, size = 'md', className } = props;

  const buttonClassName: string = clsx('button', className, {
    ['primary']: primary,
    ['button-sm']: size === 'sm',
    ['button-md']: size === 'md',
    ['button-lg']: size === 'lg',
  });

  return (
    <button className={buttonClassName} onClick={props.onClick}>
      {label}
    </button>
  );
};
