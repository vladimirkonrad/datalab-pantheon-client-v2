import Navbar from '../../components/Navbar';
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main style={{ marginTop: '80px' }}>{children}</main>
      </body>
    </html>
  );
} 