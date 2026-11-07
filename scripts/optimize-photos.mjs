/**
 * Builds the web-sized profile photos in public/images/ from the full-size
 * originals in assets/photos/ (which are not deployed).
 *
 * Photos display at 200px, so 400px covers high-DPI (2x) screens.
 * Run after replacing a photo in assets/photos/:  npm run photos
 */
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const SOURCE_DIR = path.join(process.cwd(), 'assets', 'photos')
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'images')
const SIZE = 400

fs.mkdirSync(OUTPUT_DIR, { recursive: true })

for (const file of fs.readdirSync(SOURCE_DIR).filter((name) => /\.(jpe?g|png)$/i.test(name))) {
  const source = path.join(SOURCE_DIR, file)
  const output = path.join(OUTPUT_DIR, file.replace(/\.(jpe?g|png)$/i, '.webp'))
  await sharp(source)
    .rotate() // respect camera orientation metadata
    .resize(SIZE, SIZE, { fit: 'cover', position: 'attention' })
    .webp({ quality: 80 })
    .toFile(output)
  const before = fs.statSync(source).size
  const after = fs.statSync(output).size
  console.log(`${file} -> ${path.basename(output)}: ${(before / 1024).toFixed(0)} KB -> ${(after / 1024).toFixed(0)} KB`)
}
