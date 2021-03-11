let templura = require("templura");
let statuses = require("libs/statuses")
let fever = require("turrets/fever");
//Casually stals from [Gdeft/substructure]'s techtree.js

/**
 * Node for the research tech tree.
 *
 * @property {UnlockableContent}    parent          - The parent of the current node.
 * @property {UnlockableContent}    contentType     - The unlockable content that the current node contains.
 * @property {ItemStack}            requirements    - The research requirements required to unlock this node, will use the default if set to null.
 * @property {Seq}                  objectives      - A sequence of Objectives required to unlock this node. Can be null.
 */
const node = (parent, contentType, requirements, objectives) => {
  const tnode = new TechTree.TechNode(TechTree.get(parent), contentType, requirements != null ? requirements : contentType.researchRequirements());
  let used = new ObjectSet();
  
  if(objectives != null){
    tnode.objectives.addAll(objectives);
  };
};

const cblock = name => Vars.content.getByName(ContentType.block, "pixelcraft-" + name);

//pixelcraft only campaign
node(Blocks.conveyor, templura.ancientGrotto, null, null);

node(templura.ancientGrotto, templura.loggery, null, Seq.with(new Objectives.SectorComplete(templura.ancientGrotto), new Objectives.Research(cblock("basicTurret1"))));

node(templura.loggery, templura.sinkhole, null, Seq.with(new Objectives.SectorComplete(templura.loggery), new Objectives.Research(cblock("bioDrill"))));

node(templura.sinkhole, templura.dessertWastelands, null, Seq.with(new Objectives.SectorComplete(templura.sinkhole)));

node(templura.loggery, templura.frozenFalls, null, Seq.with(new Objectives.SectorComplete(templura.sinkhole)));

node(templura.frozenFalls, templura.grasslandGrave, null, Seq.with(new Objectives.SectorComplete(templura.frozenFalls)))

node(templura.grasslandGrave, templura.birthplace, null, Seq.with(new Objectives.SectorComplete(templura.grasslandGrave)));

node(templura.sinkhole, templura.trionCentral, null, Seq.with(new Objectives.SectorComplete(templura.sinkhole), new Objectives.SectorComplete(templura.birthplace), new Objectives.Research(cblock("railgun3"))));
//mixed campaign
node(templura.ancientGrotto, templura.rustedValley, null, Seq.with(new Objectives.SectorComplete(templura.ancientGrotto)));

node(templura.rustedValley, templura.shatteredGlacier, null, Seq.with(new Objectives.SectorComplete(templura.rustedValley)));

node(templura.shatteredGlacier, templura.crossroads, null, Seq.with(new Objectives.SectorComplete(templura.shatteredGlacier)));

node(templura.crossroads, templura.dunescapeCrags, null, Seq.with(new Objectives.SectorComplete(templura.crossroads), new Objectives.Research(cblock("flamethrower4")), new Objectives.Research(Blocks.foreshadow)));

//Blocks

//Bio Technology
//node(Blocks.conveyor, statuses.blackout, ItemStack.with(), null);
//node(cblock("flamethrower3"), cblock("flamethrower4"), null, Seq.with(new Objectives.SectorComplete(templura.loggery)));