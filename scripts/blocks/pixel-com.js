const pixelframes = new DrawAnimation();

pixelframes.frameCount = 5;

const pixelcompress = extendContent(GenericSmelter,"pixelite-compresser",{});

pixelcompress.drawer = pixelframes;