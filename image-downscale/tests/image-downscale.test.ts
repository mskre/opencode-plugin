import { describe, expect, test } from "bun:test"
import sharp from "sharp"
import {
  downscaleImageDataUrl,
  rewriteMessageParts,
  MAX_IMAGE_DIMENSION,
} from "../src/lib/image-downscale"
import { ImageDownscalePlugin } from "../src/plugins/image-downscale"

async function createImageDataUrl({
  width,
  height,
  mime,
}: {
  width: number
  height: number
  mime: "image/png" | "image/jpeg"
}) {
  const image = sharp({
    create: {
      width,
      height,
      channels: 3,
      background: { r: 40, g: 80, b: 120 },
    },
  })

  const buffer = mime === "image/png" ? await image.png().toBuffer() : await image.jpeg().toBuffer()
  return `data:${mime};base64,${buffer.toString("base64")}`
}

async function createOrientedJpegDataUrl({
  width,
  height,
  orientation,
}: {
  width: number
  height: number
  orientation: number
}) {
  const buffer = await sharp({
    create: {
      width,
      height,
      channels: 3,
      background: { r: 120, g: 80, b: 40 },
    },
  })
    .jpeg()
    .withMetadata({ orientation })
    .toBuffer()

  return `data:image/jpeg;base64,${buffer.toString("base64")}`
}

async function createAnimatedGifDataUrl({
  width,
  height,
}: {
  width: number
  height: number
}) {
  const channels = 3
  const pixelsPerFrame = width * height * channels
  const frameA = Buffer.alloc(pixelsPerFrame, 32)
  const frameB = Buffer.alloc(pixelsPerFrame, 224)
  const buffer = await sharp(Buffer.concat([frameA, frameB]), {
    raw: {
      width,
      height: height * 2,
      channels,
      pageHeight: height,
    },
    pages: 2,
    animated: true,
  })
    .gif({ delay: [100, 100], loop: 0 })
    .toBuffer()

  return `data:image/gif;base64,${buffer.toString("base64")}`
}

async function getDimensions(url: string) {
  const match = url.match(/^data:([^;]+);base64,(.+)$/)
  if (!match) throw new Error("Expected a base64 data URL")
  const metadata = await sharp(Buffer.from(match[2], "base64")).metadata()
  return { width: metadata.width, height: metadata.height }
}

async function getMetadata(url: string) {
  const match = url.match(/^data:([^;]+);base64,(.+)$/)
  if (!match) throw new Error("Expected a base64 data URL")
  return sharp(Buffer.from(match[2], "base64")).metadata()
}

describe("downscaleImageDataUrl", () => {
  test("leaves already-small images unchanged", async () => {
    const original = await createImageDataUrl({ width: 1600, height: 1200, mime: "image/png" })

    const result = await downscaleImageDataUrl(original, "image/png")

    expect(result).toBe(original)
  })

  test("resizes landscape images whose width exceeds 2000px", async () => {
    const original = await createImageDataUrl({ width: 3000, height: 1000, mime: "image/png" })

    const result = await downscaleImageDataUrl(original, "image/png")
    const dimensions = await getDimensions(result)

    expect(dimensions.width).toBe(MAX_IMAGE_DIMENSION)
    expect(dimensions.height).toBe(667)
  })

  test("resizes portrait images whose height exceeds 2000px", async () => {
    const original = await createImageDataUrl({ width: 1000, height: 3000, mime: "image/jpeg" })

    const result = await downscaleImageDataUrl(original, "image/jpeg")
    const dimensions = await getDimensions(result)

    expect(dimensions.width).toBe(667)
    expect(dimensions.height).toBe(MAX_IMAGE_DIMENSION)
  })

  test("normalizes EXIF-oriented JPEGs before downscaling", async () => {
    const original = await createOrientedJpegDataUrl({
      width: 1000,
      height: 3000,
      orientation: 6,
    })

    const result = await downscaleImageDataUrl(original, "image/jpeg")
    const dimensions = await getDimensions(result)
    const metadata = await getMetadata(result)

    expect(dimensions.width).toBe(MAX_IMAGE_DIMENSION)
    expect(dimensions.height).toBe(667)
    expect(metadata.orientation).toBeUndefined()
  })

  test("fails open when the image data cannot be decoded", async () => {
    const original = "data:image/png;base64,not-valid-base64"

    const result = await downscaleImageDataUrl(original, "image/png")

    expect(result).toBe(original)
  })

  test("returns oversized animated GIFs unchanged", async () => {
    const original = await createAnimatedGifDataUrl({ width: 3000, height: 1000 })

    const result = await downscaleImageDataUrl(original, "image/gif")

    expect(result).toBe(original)
  })
})

describe("rewriteMessageParts", () => {
  test("only rewrites oversized image file parts", async () => {
    const largeImage = await createImageDataUrl({ width: 3200, height: 1600, mime: "image/png" })
    const smallImage = await createImageDataUrl({ width: 1200, height: 900, mime: "image/png" })
    const parts = [
      { type: "text", text: "keep me" },
      { type: "file", mime: "application/pdf", filename: "doc.pdf", url: "data:application/pdf;base64,Zm9v" },
      { type: "file", mime: "image/png", filename: "large.png", url: largeImage },
      { type: "file", mime: "image/png", filename: "small.png", url: smallImage },
    ]

    const result = await rewriteMessageParts(parts)
    const resizedDimensions = await getDimensions(result[2].url)

    expect(result[0]).toEqual(parts[0])
    expect(result[1]).toEqual(parts[1])
    expect(result[2].url).not.toBe(largeImage)
    expect(result[3].url).toBe(smallImage)
    expect(resizedDimensions.width).toBe(MAX_IMAGE_DIMENSION)
    expect(resizedDimensions.height).toBe(1000)
  })
})

describe("ImageDownscalePlugin", () => {
  test("rewrites oversized image parts inside experimental.chat.messages.transform", async () => {
    const plugin = await ImageDownscalePlugin({} as never)
    const largeImage = await createImageDataUrl({ width: 2800, height: 1400, mime: "image/png" })
    const output = {
      messages: [
        {
          info: { role: "user" },
          parts: [
            { type: "text", text: "hello" },
            { type: "file", mime: "image/png", filename: "upload.png", url: largeImage },
          ],
        },
      ],
    }

    await plugin["experimental.chat.messages.transform"]?.({}, output)
    const dimensions = await getDimensions(output.messages[0].parts[1].url)

    expect(dimensions.width).toBe(MAX_IMAGE_DIMENSION)
    expect(dimensions.height).toBe(1000)
    expect(output.messages[0].parts[0]).toEqual({ type: "text", text: "hello" })
  })
})
