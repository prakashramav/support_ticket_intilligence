import Navbar from '../components/Navbar';
import './globals.css';

export const metadata = {
  title: 'Support Ticket Intelligence',
  description: 'AI-Powered Support Ticket Intelligence Platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full bg-gray-50 dark:bg-gray-950">
      <body className="h-full flex flex-col font-sans text-gray-900 dark:text-gray-100">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Support Ticket Intelligence. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
