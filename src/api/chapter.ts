import { client } from "@/fetchClient";
import { ChapterDetails } from "@/types/ChapterDetails";

export const getChapter = (id: number) => {
  return client.get<ChapterDetails>(`/chapters/${id}`);
};
