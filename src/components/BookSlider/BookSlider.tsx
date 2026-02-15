"use client";

import React from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./BookSlider.module.scss";
import Container from "../Container/Container";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { BookCard } from "@/types/Book";
import Link from "next/link";
import { timeSince } from "@/helpers/timeSince";
import { ApiImage } from "../ApiImage/ApiImage";

type Props = {
  title: string;
  books: BookCard[];
};

export default function BookSlider({ title, books }: Props) {
  return (
    <Container>
      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.buttons}>
          <button id="prev" className={styles.customPrev}>
            ‹
          </button>
          <button id="next" className={styles.customNext}>
            ›
          </button>
        </div>
      </div>
      <Swiper
        slidesPerView={6}
        spaceBetween={10}
        grabCursor={true}
        navigation={{
          nextEl: "#next",
          prevEl: "#prev",
        }}
        modules={[Navigation]}
        className="mySwiper"
      >
        {books.slice(0, 10).map((book) => (
          <SwiperSlide key={book.id}>
            <Link href={`/library/${book.id}`}>
              <div className={styles.card}>
                <ApiImage
                  srcPath={book.imageUrl}
                  alt={book.name}
                  width={150}
                  height={220}
                  className={styles.bookImage}
                />
                <div className={styles.content}>
                  <h2 className={styles.bookTitle}>{book.name}</h2>
                  <div className={styles.bookChapters}>
                    {`${book.chapterCount} chapters`}
                  </div>
                  <div className={styles.bookLatestUpdate}>
                    {`about ${timeSince(book.lastUpdate)}`}
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}
