import React from "react";
import styles from "./BookmarksCard.module.scss";
import Image from "next/image";
import StarIcon from "@mui/icons-material/Star";
import { Bookmark } from "@/types/Bookmark";
import Link from "next/link";

type Props = {
  bookmark: Bookmark;
};

export default function BookmarksCard({ bookmark }: Props) {
  return (
    <Link href={`/library/${bookmark.book_id}`}>
      <div className={styles.card}>
        <Image
          src="/images/image1.webp"
          alt={bookmark.name}
          width={115}
          height={160}
        />
        <div className={styles.content}>
          <h2 className={styles.bookmarkTitle}>{bookmark.name}</h2>
          <div
            className={styles.bookmarkChapters}
          >{`${bookmark.chapterCount} chapters`}</div>
          <div className={styles.bookmarkRating}>
            <StarIcon
              sx={{ color: "#FFD700", marginRight: 0.5 }}
              fontSize="medium"
            />
            <span>{bookmark.averageRating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
