// Gera assets do build:
//  - WebP para cada PNG em public/images (regenera se faltar/estiver velho)
//  - public/og-image.jpg (1200x630) — gerada UMA vez (asset estático versionado)
//  - public/favicon.ico — gerado UMA vez a partir do favicon.svg
// Roda no prebuild. Falhas não abortam o build (o <picture> cai no PNG).
import { readdir, stat, access, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const imagesDir = join(root, 'public', 'images')
const publicDir = join(root, 'public')

async function main() {
  let sharp
  try {
    sharp = (await import('sharp')).default
  } catch {
    console.warn('[gen-assets] sharp indisponível — pulando geração de assets.')
    return
  }

  // 1) PNG -> WebP
  let files = []
  try {
    files = (await readdir(imagesDir)).filter((f) => /\.png$/i.test(f))
  } catch {
    console.warn('[gen-assets] public/images não encontrado.')
  }
  for (const file of files) {
    const src = join(imagesDir, file)
    const out = src.replace(/\.png$/i, '.webp')
    try {
      if (await isFresh(src, out)) continue
      await sharp(src).webp({ quality: 82 }).toFile(out)
      console.log(`[gen-assets] webp: images/${file.replace(/\.png$/i, '.webp')}`)
    } catch (err) {
      console.warn(`[gen-assets] falha ao converter ${file}:`, err.message)
    }
  }

  // 2) og-image.jpg (gerada uma vez — asset estático versionado)
  try {
    await buildOgImage(sharp)
  } catch (err) {
    console.warn('[gen-assets] falha na og-image:', err.message)
  }

  // 3) favicon.ico (gerado uma vez a partir do SVG)
  try {
    await buildFavicon(sharp)
  } catch (err) {
    console.warn('[gen-assets] falha no favicon.ico:', err.message)
  }
}

async function isFresh(src, out) {
  try {
    const [a, b] = await Promise.all([stat(src), stat(out)])
    return b.mtimeMs >= a.mtimeMs
  } catch {
    return false
  }
}

async function exists(p) {
  try {
    await access(p)
    return true
  } catch {
    return false
  }
}

async function buildOgImage(sharp) {
  const terno = join(imagesDir, 'dr-luiz-terno.png')
  const outPath = join(publicDir, 'og-image.jpg')
  if (await exists(outPath)) {
    console.log('[gen-assets] og-image.jpg já existe — mantendo asset estático.')
    return
  }
  if (!(await exists(terno))) return

  const W = 1200
  const H = 630
  const photoW = 540 // ~45% da largura
  const panelW = W - photoW // faixa forest à esquerda

  // Foto à direita, cover + topo (rosto nunca corta).
  const photo = await sharp(terno)
    .resize(photoW, H, { fit: 'cover', position: 'top' })
    .toBuffer()

  // Painel de texto à esquerda. Margens generosas (zonas de corte de
  // WhatsApp/Instagram comem as bordas): conteúdo dentro de x[80,600] y[150,470].
  const svg = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
      <defs>
        <linearGradient id="seam" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#1E3A2F" stop-opacity="1"/>
          <stop offset="1" stop-color="#1E3A2F" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <!-- funde a foto na faixa forest -->
      <rect x="${panelW}" y="0" width="120" height="${H}" fill="url(#seam)"/>
      <!-- hairline bronze vertical na emenda -->
      <rect x="${panelW - 2}" y="0" width="2" height="${H}" fill="#B8925A" fill-opacity="0.7"/>

      <!-- marca LP -->
      <rect x="80" y="150" width="60" height="60" fill="none" stroke="#C9A46B" stroke-width="2"/>
      <text x="110" y="191" font-family="'Playfair Display', Georgia, 'Times New Roman', serif" font-size="30" font-weight="600" fill="#E8D7B5" text-anchor="middle">LP</text>

      <!-- nome -->
      <text x="78" y="318" font-family="'Playfair Display', Georgia, 'Times New Roman', serif" font-size="60" font-weight="600" fill="#F3EDDF">Dr. Luiz Prestes</text>

      <!-- subtítulo -->
      <text x="80" y="364" font-family="'Source Sans 3', Arial, sans-serif" font-size="21" fill="rgba(243,237,223,0.82)">Psiquiatra em Palmas · Instituto de Psiquiatria Moderna</text>

      <!-- hairline bronze separando -->
      <rect x="80" y="398" width="470" height="1.5" fill="#B8925A" fill-opacity="0.55"/>

      <!-- credencial -->
      <text x="80" y="440" font-family="'Source Sans 3', Arial, sans-serif" font-size="17" font-weight="700" letter-spacing="3" fill="rgba(243,237,223,0.6)">CRM-TO 1751 · RQE 1621</text>
    </svg>
  `)

  await sharp({
    create: { width: W, height: H, channels: 4, background: '#1E3A2F' },
  })
    .composite([
      { input: photo, left: panelW, top: 0 },
      { input: svg, left: 0, top: 0 },
    ])
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(outPath)

  console.log('[gen-assets] og-image.jpg gerada.')
}

async function buildFavicon(sharp) {
  const svgPath = join(publicDir, 'favicon.svg')
  const outPath = join(publicDir, 'favicon.ico')
  if (await exists(outPath)) {
    console.log('[gen-assets] favicon.ico já existe — mantendo.')
    return
  }
  if (!(await exists(svgPath))) return

  const png = await sharp(svgPath, { density: 384 })
    .resize(64, 64)
    .png()
    .toBuffer()
  await writeFile(outPath, pngToIco(png, 64))
  console.log('[gen-assets] favicon.ico gerado.')
}

// Empacota um PNG num container .ico (PNG-in-ICO, suportado por navegadores modernos).
function pngToIco(png, size) {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0) // reserved
  header.writeUInt16LE(1, 2) // type: icon
  header.writeUInt16LE(1, 4) // count
  const dir = Buffer.alloc(16)
  dir.writeUInt8(size >= 256 ? 0 : size, 0) // width
  dir.writeUInt8(size >= 256 ? 0 : size, 1) // height
  dir.writeUInt8(0, 2) // palette
  dir.writeUInt8(0, 3) // reserved
  dir.writeUInt16LE(1, 4) // color planes
  dir.writeUInt16LE(32, 6) // bits per pixel
  dir.writeUInt32LE(png.length, 8) // size of image data
  dir.writeUInt32LE(6 + 16, 12) // offset
  return Buffer.concat([header, dir, png])
}

main()
