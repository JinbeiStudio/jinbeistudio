// Generated from jinbeistudio-sea by tools/sync.ts. Edit it there, not here.
import type { Creature } from './engine';
import { jellyfish } from './creatures/jellyfish';
import { manta } from './creatures/manta';
import { orca } from './creatures/orca';
import { shark } from './creatures/shark';
import { turtle } from './creatures/turtle';
import { whale } from './creatures/whale';
import { whaleShark } from './creatures/whaleshark';
export { whaleSharkExtras, withExtras } from './creatures/whaleshark';

export { render, prepare, animate, aspect, type Creature, type Prepared, type RenderOptions } from './engine';

export const creatures = { whaleShark, shark, turtle, whale, manta, orca, jellyfish } satisfies Record<string, Creature>;
export type CreatureKind = keyof typeof creatures;
