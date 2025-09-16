import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar/page";
import { FirebaseProvider } from "./context/firebase";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "BitTree – One Link to Share Everything",
  description: "Your all-in-one bio link to share everything you create.",
  icons: {
    icon: "/favicon.png",   
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <FirebaseProvider>
          <Navbar />
          {children}
        </FirebaseProvider>
      </body>
    </html>
  );
}
