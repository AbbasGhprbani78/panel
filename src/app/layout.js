import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import { CountProvaider } from "../context/CartContext";
export const metadata = {
  title: "panel",
};

export default function RootLayout({ children }) {
  return (
    <html style={{ maxWidth: "1676px", margin: "0 auto" }} lang="fa" dir="rtl">
      <body >
        <CountProvaider>
          {children}
        </CountProvaider>
      </body>
    </html>
  );
}
