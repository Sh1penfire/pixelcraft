const ioniser = extendContent(PowerTurret, "electricTurret4b1", {
  icons(){
    return [
      Core.atlas.find("block-2"),
      Core.atlas.find("pixelcraft-electricTurret3b1")
    ];
  }
});
ioniser.size = 4;
