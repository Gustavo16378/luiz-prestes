interface PictureProps {
  /** Caminho do PNG em /public (ex.: /images/dr-luiz-terno.png) */
  src: string
  alt: string
  width: number
  height: number
  className?: string
  /** Hero e afins: eager + alta prioridade. Demais: lazy. */
  priority?: boolean
  sizes?: string
  /** object-position da imagem (ex.: 'center top' para não cortar o rosto). */
  position?: string
}

/**
 * Renderiza <picture> com fonte WebP (gerada no build) e fallback PNG.
 * width/height explícitos evitam layout shift; imagens abaixo da dobra são lazy.
 */
export function Picture({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes,
  position = 'center',
}: PictureProps) {
  const webp = src.replace(/\.png$/i, '.webp')

  // fetchpriority é válido no DOM, mas ainda não tipado no React 18.
  const extra: Record<string, string> = priority ? { fetchpriority: 'high' } : {}

  return (
    <picture>
      <source srcSet={webp} type="image/webp" />
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={className}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: position,
        }}
        {...extra}
      />
    </picture>
  )
}
