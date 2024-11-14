import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bookmarks",
  description: "",
};

export default function BookMarksLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>{children}</main>
  );
}
