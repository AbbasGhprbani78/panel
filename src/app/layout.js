import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
export const metadata = {
  title: "panel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
