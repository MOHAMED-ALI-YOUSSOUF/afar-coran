import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Link from 'next/link';

export default function Home() {


  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <Header />
      <div 
        className="flex-1 flex items-center justify-center bg-cover bg-center" 
        style={{ backgroundImage: "url('/bg-coran.jpg')" }}
      >
      
        <Link href="/coran" >
        <button 
          
          className="px-6 py-3 bg-emerald-700 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-emerald-800 transition cursor-pointer"
          >
          📖 Accéder à la traduction du Quran
        </button>
          </Link>
      </div>
      
      <Footer />
    </div>
  );
}