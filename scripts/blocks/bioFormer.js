const bioFormerAni = new DrawAnimation();

bioFormerAni.frameCount = 9;
bioFormerAni.frameSpeed = 30;
const bioFormer = extendContent(GenericCrafter,"bioFormer",{});

bioFormer.drawer = bioFormerAni;