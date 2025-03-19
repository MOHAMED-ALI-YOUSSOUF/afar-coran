const fs = require('fs').promises;

async function renameAudioFiles() {
  const audioFolder = './quran_audios'; // Dossier des audios
  const files = await fs.readdir(audioFolder);

  for (const file of files) {
    if (file.match(/\.(m4a)$/i)) {
      try {
        // Extraire le numéro de page à la fin du nom (avant l'extension)
        const match = file.match(/(\d+|[٠١٢٣٤٥٦٧٨٩]+)\.m4a$/);
        if (match) {
          let pageNum = match[1];
          // Convertir les chiffres arabes en chiffres latins
          const arabicToLatin = {
            '٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4',
            '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9'
          };
          pageNum = pageNum.split('').map(char => arabicToLatin[char] || char).join('');
          pageNum = parseInt(pageNum);

          // Ajuster le numéro pour correspondre aux images
          // On suppose que l'audio "سورة_البقرة_٤.m4a" correspond à la page 4 (Al-Fatiha est manquante dans ta liste)
          const adjustedPageNum = pageNum + 0; // Page 4 audio -> page 4 image, page 5 audio -> page 5 image, etc.

          // Nouveau nom
          const newFileName = `audio_page_${adjustedPageNum}.m4a`;
          await fs.rename(`${audioFolder}/${file}`, `${audioFolder}/${newFileName}`);
          console.log(`Renamed ${file} to ${newFileName}`);
        } else {
          console.log(`Skipped ${file}: No page number found`);
        }
      } catch (error) {
        console.error(`Error renaming ${file}: ${error.message}`);
      }
    }
  }

  console.log('Renaming completed!');
}

renameAudioFiles().catch(error => console.error('Global error:', error.message));