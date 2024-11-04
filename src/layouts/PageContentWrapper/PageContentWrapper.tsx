import { ReactNode } from 'react';
import './PageContentWrapper.scss';

export const PageContentWrapper = ({ children }: { children?: ReactNode }) => {
  return <div className="page-content__wrapper">{children}</div>;
};
