export interface BookCard {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  genres: string[];
  tags: string[];
  averageRating: number;
  chapterCount: number;
  lastUpdate: string;
}
