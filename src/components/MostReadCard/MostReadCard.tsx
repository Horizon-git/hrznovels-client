import { BookCard } from "@/types/Book";
import React from "react";
import styles from "./MostReadCard.module.scss";
import StarIcon from "@mui/icons-material/Star";
import Link from "next/link";
import { ApiImage } from "../ApiImage/ApiImage";

type Props = {
  book: BookCard;
  id: number;
};

export default function MostReadCard({ book, id }: Props) {
  return (
    <div className={styles.card}>
      <ApiImage
        srcPath={book.imageUrl}
        alt={book.name}
        width={115}
        height={160}
      />
      <div className={styles.content}>
        <h2 className={styles.cardId}>{`#${id}`}</h2>
        <h3 className={styles.cardTitle}>
          <Link href={`/library/${book.id}`}>{book.name}</Link>
        </h3>
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
