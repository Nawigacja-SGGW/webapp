import { ReactNode } from 'react';
import './PageContentWrapper.scss';

export type PageContentWrapperProps = {
  noHorizontalPadding?: boolean;
  children?: ReactNode;
  noPadding?: boolean;
};

export const PageContentWrapper = ({
  children,
  noHorizontalPadding,
  noPadding,
}: PageContentWrapperProps) => {
  return (
    <div
      className={`page-content__wrapper ${noHorizontalPadding ? 'no-horizontal-padding' : ''} ${noPadding ? 'no-padding' : ''}`}
    >
      {children}
    </div>
  );
};
