const cloudinary = require('cloudinary').v2;
const fs = require('fs').promises;

cloudinary.config({
  cloud_name: 'dopax15ru', // Remplace par ton cloud_name
  api_key: '886966741327551', // Remplace par ton API Key
  api_secret: 'kXIsQDR9N1pyzYz1xYDR0M6Js3g', // Remplace par ton API Secret
  secure: true,
});

async function uploadQuranAssets() {
  const imageFolder = './quran_pages'; // Dossier des images
  const audioFolder = './quran_audios'; // Dossier des audios

  // Uploader les images (limité à 49)
  const imageFiles = await fs.readdir(imageFolder);
  for (const file of imageFiles) {
    if (file.match(/\.(jpg|jpeg|png)$/i)) {
      try {
        const pageNum = parseInt(file.split('_')[1].split('.')[0]); // Extrait le numéro (ex. 1, 2, ...)
        if (pageNum >= 1 && pageNum <= 49) { // Limite à 49
          const result = await cloudinary.uploader.upload(`${imageFolder}/${file}`, {
            public_id: `page_${pageNum}`,
            folder: 'quran/images',
            overwrite: true,
          });
          console.log(`Uploaded image ${file} to ${result.secure_url}`);
        }
      } catch (error) {
        console.error(`Error uploading image ${file}: ${error.message}`);
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  // Uploader les audios (limité à 49)
  const audioFiles = await fs.readdir(audioFolder);
  for (const file of audioFiles) {
    if (file.match(/\.(m4a|mp3|wav)$/i)) {
      try {
        const pageNum = parseInt(file.split('_')[2].split('.')[0]); // Extrait le numéro (ex. 1, 2, ...)
        if (pageNum >= 1 && pageNum <= 49) { // Limite à 49
          const result = await cloudinary.uploader.upload(`${audioFolder}/${file}`, {
            public_id: `audio_page_${pageNum}`,
            folder: 'quran/audios',
            resource_type: 'video',
            overwrite: true,
          });
          console.log(`Uploaded audio ${file} to ${result.secure_url}`);
        }
      } catch (error) {
        console.error(`Error uploading audio ${file}: ${error.message}`);
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  // Générer un fichier JSON avec les URLs (limité à 49)
  const assets = {};
  for (let i = 1; i <= 49; i++) {
    assets[`page_${i}`] = {
      image: `https://res.cloudinary.com/ton_cloud_name/image/upload/v1/quran/images/page_${i}.png`,
      audio: `https://res.cloudinary.com/ton_cloud_name/image/upload/v1/quran/audios/audio_page_${i}.m4a`,
    };
  }
  await fs.writeFile('quran_assets_49.json', JSON.stringify(assets, null, 2));
  console.log('Upload and JSON generation (49 pages) completed!');
}

uploadQuranAssets().catch(error => console.error('Global error:', error.message));
