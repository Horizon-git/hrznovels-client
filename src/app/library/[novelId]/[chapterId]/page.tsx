"use client";

import Container from "@/components/Container/Container";
import { fetchChapter } from "@/features/chapterDetailsSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import styles from "./page.module.scss";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import { Button } from "@mui/material";

export default function Novel() {
  const { novelId, chapterId } = useParams();
  const { chapterDetails, loading, error } = useAppSelector(
    (state) => state.chapterDetails
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchChapter(+chapterId));
  }, [dispatch, chapterId]);

  const bookId = chapterDetails?.book.id;

  const prevChapterId = chapterDetails?.prevChapterId; // Должно быть получено из API
  const nextChapterId = chapterDetails?.nextChapterId;

  return (
    <>
      <header className={styles.chapterHeader}>
        <Link
          href={`/library/${bookId}`}
          className={styles.backLink}
        >
          <ArrowBackIcon fontSize="small" />
          <span>{chapterDetails?.book.name}</span>
        </Link>
      </header>
      <Container>
        <div className={styles.chapterButtons}>
          <Button
            variant="outlined"
            color="secondary"
            disabled={!prevChapterId}
            component={Link}
            href={`/library/${bookId}/${prevChapterId}`}
          >
            Previous Chapter
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            href={`/library/${bookId}`}
          >
            TOC
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            disabled={!nextChapterId}
            component={Link}
            href={`/library/${bookId}/${nextChapterId}`}
          >
            Next Chapter
          </Button>
        </div>
        <div className={styles.chapterWrapper}>
          <h1
            className={styles.chapterTitle}
          >{`Chapter ${chapterDetails?.chapterNumber} ${chapterDetails?.title}`}</h1>
          <div className={styles.chapterContent}>{chapterDetails?.content}</div>
        </div>
      </Container>
    </>
  );
}
