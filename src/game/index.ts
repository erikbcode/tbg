export interface MobStats {
  name: string;
  maxHP: number;
  currentHP: number;
  attackDamage: number;
  isNPC: boolean;
}

export interface PlayerStats extends MobStats {
  potionCount: number;
  abilityCooldown: number;
  killCount: number;
  maxCooldown: number;
  abilityName: string;
  shield: number;
}

export function Rand(max: number): number {
  return Math.floor(Math.random() * (max + 1));
}

export const availableEnemies: Array<MobStats> = [
  { name: 'Skeleton', maxHP: 75, currentHP: 0, attackDamage: 20, isNPC: true },
  { name: 'Zombie', maxHP: 25, currentHP: 0, attackDamage: 10, isNPC: true },
  { name: 'Fighter', maxHP: 150, currentHP: 0, attackDamage: 15, isNPC: true },
  { name: 'Assassin', maxHP: 10, currentHP: 0, attackDamage: 50, isNPC: true },
];

// Add a new type called class or hero
export const availableHeros: Array<PlayerStats> = [
  {
    name: 'Mage',
    maxHP: 100,
    currentHP: 0,
    attackDamage: 20,
    isNPC: false,
    potionCount: 3,
    abilityCooldown: 0,
    maxCooldown: 10,
    killCount: 0,
    abilityName: 'Fireball',
    shield: 0,
  },
  {
    name: 'Warrior',
    maxHP: 150,
    currentHP: 0,
    attackDamage: 40,
    isNPC: false,
    potionCount: 3,
    abilityCooldown: 0,
    maxCooldown: 7,
    killCount: 0,
    abilityName: 'Shield',
    shield: 0,
  },
];

// Function to spawn a hero, index is the class corresponding to selection
export function spawnHero(index: number): PlayerStats {
  const hero = availableHeros[index];
  hero.currentHP = hero.maxHP;
  return hero;
}

// MobStats is the return type
export function spawnMob(): MobStats {
  const enemy = availableEnemies[Rand(availableEnemies.length - 1)];
  enemy.currentHP = enemy.maxHP;
  return enemy;
}

export const potionHealAmount = 30;
