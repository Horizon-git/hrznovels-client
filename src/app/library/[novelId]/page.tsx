"use client";

import { useParams } from "next/navigation";
import styles from "./page.module.scss";
import { useEffect, useMemo, useState } from "react";
import Container from "@/components/Container/Container";
import Image from "next/image";
import Chips from "@/components/Chips/Chips";
import CheckIcon from "@mui/icons-material/Check";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchBook } from "@/features/bookDetailsSlice";
import Link from "next/link";
import { timeSince } from "@/helpers/timeSince";
import RatingStars from "@/components/RatingStars/RatingStars";
import ReviewModal from "@/components/ReviewModal/ReviewModal";
import { fetchBookmarks, toggleBookmarkAsync } from "@/features/bookmarksSlice";
import { ApiImage } from "@/components/ApiImage/ApiImage";

enum Tab {
  Chapters,
  Reviews,
}

export default function Novel() {
  const { novelId } = useParams();
  const { bookDetails, loading, error } = useAppSelector(
    (state) => state.bookDetails
  );
  const { user } = useAppSelector((state) => state.auth);
  const { bookmarks } = useAppSelector((state) => state.bookmarks);
  const dispatch = useAppDispatch();

  const [currentTab, setCurrentTab] = useState<Tab>(Tab.Chapters);

  const isBookmarked = useMemo(() => {
    return bookmarks.some((bookmark) => bookmark.book_id === +novelId);
  }, [bookmarks, novelId]);

  useEffect(() => {
    if (user) {
      dispatch(fetchBookmarks(user.id));
    }
    dispatch(fetchBook(+novelId));
  }, [dispatch, novelId, user]);

  const averageRating = bookDetails
    ? Math.round(
        bookDetails.reviews.reduce((sum, review) => sum + review.rating, 0) /
          bookDetails.reviews.length
      )
    : 0;

  const latestChapterDate = bookDetails?.chapters.reduce((latest, chapter) =>
    new Date(chapter.createdAt) > new Date(latest.createdAt) ? chapter : latest
  ).createdAt;

  const handleAddBookmark = () => {
    if (user) {
      dispatch(toggleBookmarkAsync({ bookId: +novelId, userId: +user.id }));
    } else {
      console.error("Only users can add bookmarks, please login first");
    }
  };

  return (
    <Container>
      {bookDetails ? (
        <>
          <div className={styles.mainInfo}>
            <ApiImage
              srcPath={bookDetails.imageUrl}
              alt={bookDetails.name}
              width={300}
              height={400}
            />
            <div className={styles.right}>
              <h1>{bookDetails.name}</h1>
              <div className={styles.bookRating}>
                <div className={styles.ratingWithCount}>
                  <RatingStars rating={averageRating} />
                  <span>{`(${bookDetails.reviews.length})`}</span>
                </div>
                <span>{`Latest update: ${timeSince(latestChapterDate)}`}</span>
              </div>
              <div className={styles.genres}>
                <p className={styles.chipSpan}>Gengres:</p>
                <Chips names={bookDetails.genres} />
              </div>
              <div className={styles.tags}>
                <p className={styles.chipSpan}>Tags:</p>
                <Chips names={bookDetails.tags} />
              </div>
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
          <div className={styles.info}>
            <h2 className={styles.infoTitle}>Description</h2>
            <p className={styles.infoDescription}>{bookDetails.description}</p>
          </div>
          <div className={styles.bottomWrapper}>
            <div className={styles.bookTabContainer}>
              <span
                className={`${styles.tab} ${
                  currentTab === Tab.Chapters ? styles.active : ""
                }`}
                onClick={() => setCurrentTab(Tab.Chapters)}
              >{`Chapters (${bookDetails.chapters.length})`}</span>
              <span
                className={`${styles.tab} ${
                  currentTab === Tab.Reviews ? styles.active : ""
                }`}
                onClick={() => setCurrentTab(Tab.Reviews)}
              >{`Reviews (${bookDetails.reviews.length})`}</span>
            </div>
            {currentTab === Tab.Chapters ? (
              <div className={styles.bookTabContent}>
                {bookDetails.chapters.map((chapter) => (
                  <Link
                    key={chapter.id}
                    href={`/library/${novelId}/${chapter.id}`}
                    className={styles.chapter}
                  >
                    <span
                      className={styles.chapterTitle}
                    >{`Chapter ${chapter.chapterNumber} ${chapter.title}`}</span>
                    <span>{`${timeSince(chapter.createdAt)}`}</span>
                  </Link>
                ))}
              </div>
            ) : (
              <>
                {user && (
                  <ReviewModal bookId={+novelId} bookTitle={bookDetails.name} />
                )}
                <div className={styles.reviewTabContent}>
                  {[...bookDetails.reviews].reverse().map((review) => (
                    <div key={review.id} className={styles.reviewCard}>
                      <div className={styles.userInfo}>
                        <Image
                          src="/images/nopicture.webp"
                          alt="user picture"
                          width={60}
                          height={60}
                        />
                        <span>{`@${review.user.username}`}</span>
                      </div>
                      <div className={styles.reviewContent}>
                        <div className={styles.bookRating}>
                          <RatingStars rating={review.rating} />
                          <span
                            className={styles.reviewCreatedAt}
                          >{`about ${timeSince(review.createdAt)}`}</span>
                        </div>
                        <p className={styles.reviewTitle}>{review.title}</p>
                        <p className={styles.reviewComment}>{review.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </>
      ) : (
        <p>Novel not found</p>
      )}
    </Container>
  );
}
