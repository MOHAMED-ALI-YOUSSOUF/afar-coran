import React from 'react';

interface PageDisplayProps {
  pageData: { image: string; audio: string } | undefined;
}

const PageDisplay: React.FC<PageDisplayProps> = ({ pageData }) => {
  if (!pageData) return <p className="text-center text-gray-500">Chargement...</p>;

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="mb-4">
        <img
          src={pageData.image}
          alt="Page du Coran"
          className="max-w-full max-h-[80vh] rounded shadow-lg"
        />
      </div>
    </div>
  );
};

export default PageDisplay;