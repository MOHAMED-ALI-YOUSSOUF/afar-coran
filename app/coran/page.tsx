"use client";
import AudioPlayer from '@/components/AudioPlayer';
import PageDisplay from '@/components/PageDisplay';
import Sidebar from '@/components/Sidebar';
import React, { useState, useEffect, useRef } from 'react';


export default function Coran() {
  const [pages, setPages] = useState<Record<string, { image: string; audio: string }>>({});
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null); // Référence à l'élément audio

  useEffect(() => {
    setLoading(true);
    fetch('/quran_assets_49.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Loaded data:', data); // Débogage détaillé
        if (Object.keys(data).length === 0) {
          console.warn('No data loaded from JSON');
        }
        setPages(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading JSON:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handlePageSelect = (pageNum: number) => {
    console.log(`Selected page: ${pageNum}`); // Débogage
    setSelectedPage(pageNum);
    // Recharger et lancer l'audio automatiquement
    if (audioRef.current) {
      audioRef.current.load(); // Recharge la source audio
      audioRef.current
        .play()
        .catch((err) => console.warn('Autoplay blocked by browser:', err)); // Gestion des erreurs d'autoplay
    }
  };

  const currentPageData = pages[`page_${selectedPage}`];
  console.log('Current page data:', currentPageData); // Débogage

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        pages={pages}
        onPageSelect={handlePageSelect}
        selectedPage={selectedPage}
      />
      <div className="flex-1 flex flex-col justify-between">
        {loading && <p className="text-center text-gray-500">Chargement...</p>}
        {error && <p className="text-center text-red-500">Erreur : {error}</p>}
        {!loading && !error && (
          <>
            <PageDisplay pageData={currentPageData} />
            {currentPageData && (
              <AudioPlayer
                audioSrc={currentPageData.audio}
                audioRef={audioRef}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}