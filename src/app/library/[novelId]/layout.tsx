import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Novel",
  description: "",
};

export default function NovelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>{children}</main>
  );
}
