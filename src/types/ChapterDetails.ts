import { BookCard } from "./Book";

export interface ChapterDetails {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  chapterNumber: number;
  book: Pick<BookCard, "name" | "id">;
  prevChapterId: number | null;
  nextChapterId: number | null;
}
