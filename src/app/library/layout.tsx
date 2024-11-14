import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Library",
  description: "",
};

export default function LibraryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>{children}</main>
  );
}
