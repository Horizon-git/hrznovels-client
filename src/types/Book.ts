export interface BookCard {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  genres: string[];
  tags: string[];
  averageRating: number;
  reviewCount: number;
  chapterCount: number;
  lastUpdate: string;
}
