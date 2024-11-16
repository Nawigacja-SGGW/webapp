import { ReactNode } from 'react';
import './PageContentWrapper.scss';

export type PageContentWrapperProps = {
  noHorizontalPadding?: boolean;
  children?: ReactNode;
};

export const PageContentWrapper = ({ children, noHorizontalPadding }: PageContentWrapperProps) => {
  return (
    <div className={`page-content__wrapper ${noHorizontalPadding ? 'no-horizontal-padding' : ''}`}>
      {children}
    </div>
  );
};
