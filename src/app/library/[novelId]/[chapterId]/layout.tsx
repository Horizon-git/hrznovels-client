import Container from "@/components/Container/Container";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chapter",
  description: "",
};

export default function ChapterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
