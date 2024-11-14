import React from 'react'
import styles from './Footer.module.scss';
import Link from 'next/link';

export default function Footer({}) {
  return (
    <footer className={styles.footer}>
      <h1 className={styles.title}>
        <Link className={styles.link} href={'/'}>HRZNOVELS</Link>
      </h1>
      <p className={styles.copyright}>2024 HRZNOVELS All rights reserved.</p>
    </footer>
  )
}
