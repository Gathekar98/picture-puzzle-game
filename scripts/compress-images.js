import sharp from "sharp";
import fs from "fs/promises";
import path from "path";

const TARGET_DIR = "src/assets";
const MAX_DIMENSION = 800;
const JPEG_QUALITY = 80;
const PNG_QUALITY = 80;

async function compressImages() {
  const allFiles = await fs.readdir(TARGET_DIR, { recursive: true });
  const imageFiles = allFiles.filter((f) => /\.(jpg|jpeg|png)$/i.test(f));

  console.log(`Found ${imageFiles.length} images to compress...`);

  for (const file of imageFiles) {
    const filePath = path.join(TARGET_DIR, file);
    const tempPath = path.join(TARGET_DIR, path.dirname(file), `temp-${path.basename(file)}`);
    const isPng = /\.png$/i.test(file);

    const originalSize = (await fs.stat(filePath)).size;

    let pipeline = sharp(filePath).resize(MAX_DIMENSION, MAX_DIMENSION, {
      fit: "cover",
      withoutEnlargement: true,
    });

    if (isPng) {
      // PNG output preserves transparency; compressionLevel controls
      // file size (0-9, higher = smaller but slower to encode).
      pipeline = pipeline.png({ quality: PNG_QUALITY, compressionLevel: 9 });
    } else {
      pipeline = pipeline.jpeg({ quality: JPEG_QUALITY });
    }

    await pipeline.toFile(tempPath);

    const newSize = (await fs.stat(tempPath)).size;

    await fs.unlink(filePath);
    await fs.rename(tempPath, filePath);

    const savedPercent = (((originalSize - newSize) / originalSize) * 100).toFixed(1);
    console.log(`${file}: ${(originalSize / 1024).toFixed(0)}KB → ${(newSize / 1024).toFixed(0)}KB (saved ${savedPercent}%)`);
  }

  console.log("Done!");
}

compressImages().catch(console.error);