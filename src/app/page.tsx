'use client'

import Banner from "@/components/Banner/Banner";
import styles from "./page.module.scss";
import BookSlider from "@/components/BookSlider/BookSlider";
import MostReadBooks from "@/components/MostReadBooks/MostReadBooks";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { fetchBooks } from "@/features/booksSlice";
import { checkAuthAsync } from "@/features/authSlice";

export default function Home() {
  const { books, loading, error } = useAppSelector(state => state.books);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);


  return (
    <main className={styles.main}>
      <Banner books={books} />
      <section className={styles.slider}>
        <BookSlider title="Recently added" books={books} />
      </section>
      <MostReadBooks books={books} />
    </main>
  );
}
