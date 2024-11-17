import React from 'react';
import './AuthorizationFormLayout.scss';

interface FormLayoutProps {
  title: string;
  children: React.ReactNode;
}
export const FormLayout = ({ title, children }: FormLayoutProps) => {
  return (
    <div className="form-layout">
      <h2 className="form-layout__title">{title}</h2>
      <div className="form-layout__content">{children}</div>
    </div>
  );
};
