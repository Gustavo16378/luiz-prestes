// Gera WebP para cada PNG em public/images e a og-image (1200x630).
// Roda no prebuild. Falhas não abortam o build: o <picture> cai no PNG e a
// og-image é opcional para a página funcionar.
import { readdir, stat, access } from 'node:fs/promises'
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
    console.warn('[gen-assets] sharp indisponível — pulando WebP/og-image.')
    return
  }

  // 1) PNG -> WebP
  let files = []
  try {
    files = (await readdir(imagesDir)).filter((f) => /\.png$/i.test(f))
  } catch {
    console.warn('[gen-assets] public/images não encontrado.')
    return
  }

  for (const file of files) {
    const src = join(imagesDir, file)
    const out = src.replace(/\.png$/i, '.webp')
    try {
      const fresh = await isFresh(src, out)
      if (fresh) continue
      await sharp(src).webp({ quality: 82 }).toFile(out)
      console.log(`[gen-assets] webp: images/${file.replace(/\.png$/i, '.webp')}`)
    } catch (err) {
      console.warn(`[gen-assets] falha ao converter ${file}:`, err.message)
    }
  }

  // 2) og-image.jpg (1200x630)
  try {
    await buildOgImage(sharp)
  } catch (err) {
    console.warn('[gen-assets] falha na og-image:', err.message)
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
  if (!(await exists(terno))) return

  const W = 1200
  const H = 630
  const photoW = 640

  const photo = await sharp(terno)
    .resize(photoW, H, { fit: 'cover', position: 'top' })
    .toBuffer()

  const svg = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
      <defs>
        <linearGradient id="seam" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#1E3A2F" stop-opacity="1"/>
          <stop offset="1" stop-color="#1E3A2F" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <!-- scrim para fundir a foto na faixa forest -->
      <rect x="${W - photoW}" y="0" width="120" height="${H}" fill="url(#seam)"/>
      <!-- hairline bronze na emenda -->
      <rect x="${W - photoW - 2}" y="0" width="2" height="${H}" fill="#B8925A" fill-opacity="0.7"/>
      <!-- marca LP -->
      <rect x="64" y="70" width="52" height="52" fill="none" stroke="#C9A46B" stroke-width="2"/>
      <text x="90" y="106" font-family="Georgia, 'Times New Roman', serif" font-size="27" font-weight="600" fill="#E8D7B5" text-anchor="middle">LP</text>
      <!-- eyebrow -->
      <text x="66" y="210" font-family="Arial, sans-serif" font-size="19" font-weight="700" letter-spacing="4" fill="#C9A46B">INSTITUTO DE PSIQUIATRIA MODERNA</text>
      <!-- nome -->
      <text x="62" y="300" font-family="Georgia, 'Times New Roman', serif" font-size="70" font-weight="600" fill="#F3EDDF">Dr. Luiz Prestes</text>
      <!-- subtítulo -->
      <text x="66" y="352" font-family="Arial, sans-serif" font-size="26" fill="rgba(243,237,223,0.82)">Psiquiatra em Palmas — TO</text>
      <!-- serviços -->
      <text x="66" y="430" font-family="Arial, sans-serif" font-size="21" font-weight="600" letter-spacing="2" fill="#C9A46B">Psiquiatria intervencionista · Neuromodulação REAC</text>
      <!-- credencial -->
      <text x="66" y="540" font-family="Arial, sans-serif" font-size="18" font-weight="700" letter-spacing="3" fill="rgba(243,237,223,0.6)">CRM-TO 1751 · RQE 1621</text>
    </svg>
  `)

  await sharp({
    create: { width: W, height: H, channels: 4, background: '#1E3A2F' },
  })
    .composite([
      { input: photo, left: W - photoW, top: 0 },
      { input: svg, left: 0, top: 0 },
    ])
    .jpeg({ quality: 86 })
    .toFile(outPath)

  console.log('[gen-assets] og-image.jpg gerada.')
}

main()
