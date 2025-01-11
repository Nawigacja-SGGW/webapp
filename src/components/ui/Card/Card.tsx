import { ReactNode } from 'react';
import styles from './Card.module.scss';

export interface CardProps {
  children?: ReactNode;
  heading: string;
}

export const Card = ({ children, heading }: CardProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <h2>{heading}</h2>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
