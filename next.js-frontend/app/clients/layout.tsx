import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import ClientNavBar from "./components/Header/NavBar/page";

const mulish = Mulish({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const Clientlayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" className={mulish.className}>
      <body>
        <ClientNavBar></ClientNavBar>
        {children}
        </body>
    </html>
  );
};

export default Clientlayout;
