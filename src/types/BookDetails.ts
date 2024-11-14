export interface BookDetails {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  genres: string[];
  tags: string[];
  chapters: Chapter[];
  reviews: Review[];
}

export interface Chapter {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  chapterNumber: number;
}

export interface Review {
  id: number;
  rating: number;
  title: string;
  comment: string;
  createdAt: string;
  user: UserBasicInfo;
}

export interface UserBasicInfo {
  id: number;
  username: string;
}
