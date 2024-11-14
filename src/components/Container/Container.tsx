import React, { ReactNode } from 'react';
import styles from './Container.module.scss';

type Props = {
  children: ReactNode;
};

export default function Container({ children }: Props) {
  return (
    <div className={styles.container}>{children}</div>
  );
}
