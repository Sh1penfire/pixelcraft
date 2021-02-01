const seeds = new Effect(25, e => {
    Draw.color(Pal.plastaniumFront, Pal.plastaniumBack, e.fin());
    Lines.stroke(e.fout() * 3)
    Lines.circle(e.x, e.y, e.fin() * 27)
    Lines.stroke(e.fslope() * 1)
    Lines.circle(e.x, e.y, e.fslope() * 15)
    const d = new Floatc2({get(x, y){
    Lines.stroke(e.fout());
        Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x,y), e.fslope() * 10);
     }})
    Angles.randLenVectors(e.id, 30, e.fin() * 30, e.rotation, 360,d)
    Angles.randLenVectors(e.id, 10, e.fin() * 15, e.rotation, 360,d)
});

const seedExtractor = extendContent(GenericCrafter, "seed-extractor",{});
seedExtractor.craftEffect = seeds;

const bioDrill = extendContent(GenericCrafter, "bioDrill", {});
bioDrill.craftEffect = seeds;

const bioFormerAni = new DrawAnimation();
bioFormerAni.frameCount = 9;
bioFormerAni.frameSpeed = 30;
const bioFormer = extendContent(GenericCrafter,"bioFormer",{});
bioFormer.craftEffect = seeds;
bioFormer.drawer = bioFormerAni;

const bioPressAni = new DrawAnimation();
const bioPress = extendContent(GenericCrafter,"bioPress",{});
bioPress.craftEffect = seeds;
bioPress.drawer = bioPressAni;

const bioniteMixer = extendContent(GenericCrafter,"bioniteMixer",{});
bioniteMixer.craftEffect = seeds;

const bioMender = extendContent(MendProjector, "bioMender", {});