const { fromPath } = require('pdf2pic');
const fs = require('fs').promises;

async function convertPDFToImages() {
  const outputDir = './quran_pages';
  await fs.mkdir(outputDir, { recursive: true });

  const options = {
    density: 300, // Résolution (ajuste pour la qualité)
    format: 'png', // Format de sortie
    width: 600, // Largeur
    height: 800, // Hauteur
  };

  const convert = fromPath('./quran.pdf', options);
  await convert.bulk(-1); // Convertit toutes les pages (-1 = toutes)

  // Renommer les fichiers pour correspondre au format page_1.png, page_2.png, etc.
//   const files = await fs.readdir(outputDir);
  for (let i = 0; i < 2; i++) {
    const oldName = `${outputDir}/quran-${i + 1}.png`;
    const newName = `${outputDir}/page_${i + 1}.png`;
    await fs.rename(oldName, newName);
    console.log(`Renamed page ${i + 1}`);
  }

  console.log('PDF conversion completed!');
}

convertPDFToImages().catch(error => console.error('Error:', error.message));