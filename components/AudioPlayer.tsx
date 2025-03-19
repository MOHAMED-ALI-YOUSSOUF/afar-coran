import React from 'react';

interface AudioPlayerProps {
  audioSrc: string;
  audioRef: React.RefObject<HTMLAudioElement>;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioSrc, audioRef }) => {
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg">
      <audio
        ref={audioRef}
        controls
        className="w-full"
        // Personnalisation des contrôles avec des styles Tailwind (limité par le navigateur)
      >
        <source src={audioSrc} type="audio/mp4" />
      </audio>
      {/* Style personnalisé pour agrandir les boutons (approximation avec Tailwind) */}
      <style jsx>{`
        audio::-webkit-media-controls-play-button {
          width: 40px !important;
          height: 40px !important;
          background-color: #4a90e2 !important;
          border-radius: 50% !important;
        }
        audio::-webkit-media-controls-panel {
          background-color: #f0f0f0 !important;
          padding: 5px !important;
        }
      `}</style>
    </div>
  );
};

export default AudioPlayer;