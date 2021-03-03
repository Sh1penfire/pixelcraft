const pixelframes = new DrawAnimation();

pixelframes.frameCount = 5;

const pixelcompress = extendContent(GenericCrafter,"pixelite-compresser",{});

pixelcompress.drawer = pixelframes;