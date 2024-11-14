import { BookCard } from '@/types/Book'
import React from 'react'
import styles from './MostReadList.module.scss';
import MostReadCard from '../MostReadCard/MostReadCard';

type Props = {
  books: BookCard[];
}

export default function MostReadList({ books }: Props) {
  return (
    <div className={styles.listWrapper}>
      {books.slice(0, 10).map((book, id) => (
        <MostReadCard key={book.id} book={book} id={id + 1} />
      ))}
    </div>
  )
}
