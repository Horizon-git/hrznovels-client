import { BookCard } from "@/types/Book";
import React from "react";
import styles from "./MostReadCard.module.scss";
import Image from "next/image";
import StarIcon from "@mui/icons-material/Star";

type Props = {
  book: BookCard;
  id: number;
};

export default function MostReadCard({ book, id }: Props) {
  return (
    <div className={styles.card}>
      <Image
        src="/images/image1.webp"
        alt={book.name}
        width={115}
        height={160}
      />
      <div className={styles.content}>
        <h2 className={styles.cardId}>{`#${id}`}</h2>
        <h3 className={styles.cardTitle}>{book.name}</h3>
        <div className={styles.tagsWrapper}>
          <span>{book.tags.join(", ")}</span>
        </div>
        <div className={styles.cardRating}>
          <StarIcon
            sx={{ color: "#FFD700", marginRight: 0.5 }}
            fontSize="small"
          />
          <span>{book.averageRating}</span>
        </div>
      </div>
    </div>
  );
}
