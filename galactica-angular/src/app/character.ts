

import TacticsDraw from "./tacticsdraw";

export class Character {
    id: number;
    name: string;
    type: string;
    admiralInheritance: number;
    cagInheritance: number;
    presidentInheritance: number;
    set: string;
    startLocation: string;
    oncePerTurnTitle: string;
    oncePerTurnText: string;
    oncePerGameTitle: string;
    oncePerGameText: string;
    weaknessTitle: string;
    weaknessText: string;
    loyaltyWeight: number;
    alternateOf: number;
    draws: TacticsDraw[];
    
  }