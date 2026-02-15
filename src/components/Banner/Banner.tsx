"use client";

import React, { useEffect, useMemo } from "react";
import styles from "./Banner.module.scss";
import Carousel from "react-material-ui-carousel";
import { Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Image from "next/image";
import Container from "../Container/Container";
import Chips from "../Chips/Chips";
import { BookCard } from "@/types/Book";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchBookmarks, toggleBookmarkAsync } from "@/features/bookmarksSlice";
import { ApiImage } from "../ApiImage/ApiImage";

type Props = {
  books: BookCard[],
}

export default function Banner({ books }: Props) {
  return (
    <section className={styles.banner}>
      <Carousel animation="slide" duration={900}>
        {books.slice(0,8).map((book) => (
          <Item key={book.id} item={book} />
        ))}
      </Carousel>
    </section>
  );
}

type PropsItem = {
  item: BookCard;
};

function Item({ item }: PropsItem) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { bookmarks } = useAppSelector((state) => state.bookmarks);

  useEffect(() => {
    if (user) {
      dispatch(fetchBookmarks(user.id));
    }
  }, [dispatch, user]);

  const isBookmarked = useMemo(() => {
    return bookmarks.some((bookmark) => bookmark.book_id === +item.id);
  }, [bookmarks, item.id]);

  const handleAddBookmark = () => {
    if (user) {
      dispatch(toggleBookmarkAsync({ bookId: item.id, userId: +user.id }));
    } else {
      console.error("Only users can add bookmarks, please login first");
    }
  };

  return (
    <div className={styles.slide}>
      <Container>
        <div className={styles.preview}>
          <div className={styles.contentWrapper}>
            <div className={styles.content}>
              <h2>{item.name}</h2>
              <p className={styles.description}>{item.description}</p>
              <Chips names={item.genres} />
              <div className={styles.buttons}>
                <Button variant="contained" color="secondary">
                  Read now
                </Button>
                <Button
                    variant={isBookmarked ? "contained" : "outlined"}
                    color="secondary"
                    onClick={handleAddBookmark}
                    startIcon={isBookmarked ? <CheckIcon /> : <BookmarkIcon />}
                  >
                    {isBookmarked ? "Added" : "Bookmark"}
                  </Button>
              </div>
            </div>
          </div>
          <ApiImage
            className={styles.image}
            srcPath={item.imageUrl}
            alt={item.name}
            width={195}
            height={260}
          />
        </div>
        </Container>
      </div>
  );
}
