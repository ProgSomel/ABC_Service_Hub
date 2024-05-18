import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "/app/globals.css";
import { Toaster } from "react-hot-toast";
import Footer from "../components/footer/page";
import WorkerNavbar from "../components/workernavbar";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body className={inter.className}>
        <WorkerNavbar></WorkerNavbar>
        <Toaster />
        {children}
        <Footer></Footer>
        </body>
    </html>
  );
}
