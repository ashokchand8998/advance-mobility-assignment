import { Inter } from "next/font/google";
import "./globals.css";
import SideMenu from "./components/SideMenu";
import { ContextWrapper } from "./components/ContextWrapper";
import "./common-styles.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Vehicle Transfer Module",
  description: "Vehicle transfer module",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="body-container">
          <SideMenu />
          <ContextWrapper>{children}</ContextWrapper>
        </div>
      </body>
    </html>
  );
}
