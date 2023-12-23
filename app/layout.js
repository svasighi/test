import "./globals.css";
import { Vazirmatn } from "next/font/google";

const vazirmant = Vazirmatn({ subsets: ["latin"] });

export const metadata = {
  title: "اطلاعات  آیپیم چیه؟",
  description: "توسط فاطمه ندافی",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="rtl">
      <body
        className={`${vazirmant.className} bg-blured bg-cover bg-center bg-no-repeat h-full`}
      >
        {children}
      </body>
    </html>
  );
}
