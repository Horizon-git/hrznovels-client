'use client'

import React, { useState } from 'react';
import styles from './MostReadBooks.module.scss';
import Container from '../Container/Container';
import { books2 } from '@/data/books';
import MostReadList from '../MostReadList/MostReadList';
import { BookCard } from '@/types/Book';

enum ButtonType {
  Daily = 'Daily',
  Weekly = 'Weekly',
  Monthly = 'Monthly',
  AllTime = 'AllTime',
}

type Props = {
  books: BookCard[],
}

export default function MostReadBooks({ books }: Props) {
  const [activeButton, setActiveButton] = useState<ButtonType>(ButtonType.Daily);

  const handleButtonClick = (buttonName: ButtonType) => {
    setActiveButton(buttonName);
  };

  return (
    <section className={styles.wrapper}>
      <Container>
        <div className={styles.flexWrapper}>
          <h1 className={styles.title}>Most Read Novels</h1>
          <div className={styles.buttonsWrapper}>
            <button
              className={`${styles.button} ${activeButton === ButtonType.Daily ? styles.active : ''}`}
              onClick={() => handleButtonClick(ButtonType.Daily)}
            >
              {ButtonType.Daily}
            </button>
            <button
              className={`${styles.button} ${activeButton === ButtonType.Weekly ? styles.active : ''}`}
              onClick={() => handleButtonClick(ButtonType.Weekly)}
            >
              {ButtonType.Weekly}
            </button>
            <button
              className={`${styles.button} ${activeButton === ButtonType.Monthly ? styles.active : ''}`}
              onClick={() => handleButtonClick(ButtonType.Monthly)}
            >
              {ButtonType.Monthly}
            </button>
            <button
              className={`${styles.button} ${activeButton === ButtonType.AllTime ? styles.active : ''}`}
              onClick={() => handleButtonClick(ButtonType.AllTime)}
            >
              {ButtonType.AllTime}
            </button>
          </div>
        </div>
        <MostReadList books={books} />
      </Container>
    </section>
  );
}
