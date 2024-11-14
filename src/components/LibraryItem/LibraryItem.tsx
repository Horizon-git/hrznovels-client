import React from "react";
import styles from "./LibraryItem.module.scss";
import Image from "next/image";
import { BookCard } from "@/types/Book";
import Chips from "../Chips/Chips";
import Link from "next/link";

type Props = {
  book: BookCard;
};

export default function LibraryItem({ book }: Props) {
  return (
    <div className={styles.item}>
      <div className={styles.left}>
        <Image
          className={styles.image}
          src="/images/image1.webp"
          alt={book.name}
          width={160}
          height={240}
        />
        <div className={styles.content}>
          <Link href={`/library/${book.id}`}>
            <h1 className={styles.title}>{book.name}</h1>
          </Link>
          <span>Updated {5} days ago</span>
          <p>{book.description}</p>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.genres}>
          <span>Gengres:</span>
          <Chips names={book.genres} />
        </div>
        <div className={styles.tags}>
          <span>Tags:</span>
          <Chips names={book.tags} />
        </div>
      </div>
    </div>
  );
}
