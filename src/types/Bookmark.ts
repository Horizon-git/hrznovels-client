export interface Bookmark {
  book_id: number;
  name: string;
  image: string;
  averageRating: number;
  chapterCount: number;
  addedAt: string;
}

export interface BookmarkToogleRes {
  status: string;
  book_id?: number;
  bookmark?: Bookmark;
}
