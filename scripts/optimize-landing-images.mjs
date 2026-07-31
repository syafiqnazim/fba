import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const testimonialFiles = Array.from(
  { length: 6 },
  (_, index) => `app/assets/testimonials/testimoni-${index + 1}.png`,
);

const images = [
  { input: "app/assets/coach-ariff.png", width: 1280, quality: 84 },
  { input: "app/assets/coach-mahfudz.png", width: 1280, quality: 84 },
  { input: "app/assets/coach-syafie.png", width: 1280, quality: 84 },
  { input: "app/assets/ICM.png", width: 1600, quality: 84 },
  {
    input: "app/assets/programs/fba-premier-circle.png",
    width: 720,
    quality: 88,
  },
  {
    input: "app/assets/programs/reel-master.png",
    width: 1024,
    quality: 88,
  },
  ...testimonialFiles.map((input) => ({ input, width: 800, quality: 90 })),
];

async function createAppIcon() {
  const size = 512;
  const logo = await sharp(path.join(root, "app/assets/logo.png"))
    .trim({ background: "#ffffff", threshold: 10 })
    .resize({ width: 410, height: 210, fit: "inside" })
    .png()
    .toBuffer();
  const tile = Buffer.from(
    `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg"><rect width="${size}" height="${size}" rx="112" fill="#ffffff"/></svg>`,
  );

  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      { input: tile },
      { input: logo, gravity: "center" },
    ])
    .png({ compressionLevel: 9 })
    .toFile(path.join(root, "app/icon.png"));
  console.log("app/assets/logo.png -> app/icon.png");
}

await Promise.all(
  images.map(async ({ input, width, quality }) => {
    const output = input.replace(/\.png$/i, ".webp");
    await sharp(path.join(root, input))
      .resize({ width, withoutEnlargement: true })
      .webp({ quality, effort: 6, smartSubsample: true })
      .toFile(path.join(root, output));
    console.log(`${input} -> ${output}`);
  }),
);

await createAppIcon();
