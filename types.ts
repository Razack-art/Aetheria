
export enum DistrictType {
  URBAN = 'URBAN',
  NATURAL = 'NATURAL',
  FUTURE = 'FUTURE',
  FANTASY = 'FANTASY'
}

export interface District {
  id: string;
  name: string;
  type: DistrictType;
  description: string;
  color: string;
  icon: string;
}

export interface ActivityEntry {
  id: string;
  timestamp: number;
  type: 'achievement' | 'discovery' | 'purchase' | 'social';
  text: string;
}

export interface MarketItem {
  id: string;
  name: string;
  price: number;
  category: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  color: string;
}

export interface AvatarState {
  name: string;
  level: number;
  currency: number;
  specialty: string;
  appearance: {
    hairColor: string;
    skinTone: string;
    outfit: string;
  };
  skills: {
    agility: number;
    combat: number;
    creativity: number;
    social: number;
  };
  inventory: MarketItem[];
  worldDiscovery: Record<string, number>; // districtId -> timestamp of last visit
  chronicles: ActivityEntry[];
}
