import localFont from "next/font/local";
import Footer from "@/components/footer";
import Header from "@/components/header";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Sudoku",
  description: "Challenge your mind with the classic number game in its normal version, and in mega size!",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
      <div className="app">
      <Header />

        {children}

      <Footer />
    </div>
      </body>
    </html>
  );
}
