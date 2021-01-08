const rustydart = extendContent(UnitType, "rustydart", {});
rustydart.constructor = () => extend(UnitEntity, {});
rustydart.defaultController = type.RepairAI;