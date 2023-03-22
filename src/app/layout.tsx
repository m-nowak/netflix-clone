import "../../styles/globals.css";
import type { Metadata } from "next";
import ReactQueryWrapper from "./ReactQueryWrapper";

export const metadata: Metadata = {
  title: "Netflix clone",
  description: "Simple Netflix clone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReactQueryWrapper>{children}</ReactQueryWrapper>
      </body>
    </html>
  );
}
