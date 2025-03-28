import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "Afar Coran",
  description: "Afar Coran",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body >
        {children}
        </body>
    </html>
  );
}
