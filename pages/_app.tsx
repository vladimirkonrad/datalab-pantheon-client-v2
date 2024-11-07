import Navbar from '../components/Navbar';
import '../src/app/globals.css'; // Ensure this imports Tailwind CSS
import type { AppProps } from 'next/app';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>

      <Navbar />
      <Component {...pageProps} />

    </div>
  );
}

export default MyApp; 