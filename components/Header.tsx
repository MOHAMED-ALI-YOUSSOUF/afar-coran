
import { BookOpenText } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-gradient-to-r from-emerald-800 to-emerald-900 text-white py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <BookOpenText className="w-16 h-16 mx-auto mb-6 text-amber-400" />
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Traduction du Quran en afar
        </h1>
        <p className="text-xl text-emerald-100">
          Découvrez les versets traduits et récités en afar par Sheikh Hamad
        </p>
      </div>
    </header>
  );
}