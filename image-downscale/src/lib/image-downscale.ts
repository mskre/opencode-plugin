import sharp from "sharp"

export const MAX_IMAGE_DIMENSION = 2000

const FORMAT_BY_MIME = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpeg",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/avif": "avif",
  "image/tiff": "tiff",
} as const

type SupportedMime = keyof typeof FORMAT_BY_MIME

type FileLikePart = {
  type: string
  mime?: string
  url?: string
}

function parseDataUrl(url: string) {
  const match = url.match(/^data:([^;]+);base64,(.+)$/s)
  if (!match) return null
  return {
    mime: match[1],
    base64: match[2],
  }
}

export async function downscaleImageDataUrl(url: string, mime: string) {
  const format = FORMAT_BY_MIME[mime as SupportedMime]
  const parsed = parseDataUrl(url)
  if (!format || !parsed || parsed.mime !== mime) return url

  try {
    const input = Buffer.from(parsed.base64, "base64")
    const metadata = await sharp(input, { animated: false }).metadata()
    if ((metadata.pages ?? 1) > 1) {
      return url
    }

    const orientationSwapsDimensions = [5, 6, 7, 8].includes(metadata.orientation ?? 1)
    const width = orientationSwapsDimensions ? (metadata.height ?? 0) : (metadata.width ?? 0)
    const height = orientationSwapsDimensions ? (metadata.width ?? 0) : (metadata.height ?? 0)

    if (!width || !height || Math.max(width, height) <= MAX_IMAGE_DIMENSION) {
      return url
    }

    const resized = await sharp(input, { animated: false })
      .rotate()
      .resize({
        width: MAX_IMAGE_DIMENSION,
        height: MAX_IMAGE_DIMENSION,
        fit: "inside",
        withoutEnlargement: true,
      })
      .toFormat(format)
      .toBuffer()

    return `data:${mime};base64,${resized.toString("base64")}`
  } catch {
    return url
  }
}

export async function rewriteMessageParts<T extends FileLikePart>(parts: T[]) {
  return Promise.all(
    parts.map(async (part) => {
      if (part.type !== "file") return part
      if (!part.mime?.startsWith("image/")) return part
      if (!part.url) return part

      const url = await downscaleImageDataUrl(part.url, part.mime)
      if (url === part.url) return part

      return {
        ...part,
        url,
      }
    }),
  )
}
