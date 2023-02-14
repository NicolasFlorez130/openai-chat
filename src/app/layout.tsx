import Footer from './components/Footer';
import Header from './components/Header';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html data-theme="lofi" lang="en">
         <head />
         <body className="grid grid-rows-[auto_1fr_auto] h-screen">
            <Header />
            <main className='max-h-full overflow-auto'>{children}</main>
            <Footer />
         </body>
      </html>
   );
}
