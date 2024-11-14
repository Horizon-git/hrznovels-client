import { client } from "@/fetchClient";
import { BookCard } from "@/types/Book";
import { BookDetails } from "@/types/BookDetails";

export const getBooks = () => {
  return client.get<BookCard[]>('/books');
};

export const getBook = (id: number) => {
  return client.get<BookDetails>(`/books/${id}`);
};

export const addReview = (bookId: number, userId: number, rating: number, title: string, comment: string) => {
  return client.post('/reviews', {
    bookId,
    userId,
    rating,
    title,
    comment,
  }, localStorage.getItem('accessToken'));
};
