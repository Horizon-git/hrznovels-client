import { client } from "@/fetchClient";
import { Bookmark, BookmarkToogleRes } from "@/types/Bookmark";

export const getBookmarks = (userId: number) => {
  return client.get<Bookmark[]>(`/bookmarks/user/${userId}`, localStorage.getItem('accessToken'));
};

export const toggleBookmark = (bookId: number, userId: number) => {
  return client.post<BookmarkToogleRes>(
    `/bookmarks/toggle`,
    { bookId, userId },
    localStorage.getItem('accessToken')
  );
};

