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
}

export function Rand(max: number): number {
  return Math.floor(Math.random() * (max + 1));
}

export const availableEnemies: Array<MobStats> = [
  { name: 'Skeleton', maxHP: 75, currentHP: 0, attackDamage: 25, isNPC: true },
  { name: 'Zombie', maxHP: 25, currentHP: 0, attackDamage: 10, isNPC: true },
  { name: 'Warrior', maxHP: 200, currentHP: 0, attackDamage: 3, isNPC: true },
  { name: 'Assassin', maxHP: 10, currentHP: 0, attackDamage: 50, isNPC: true },
];

// Add a new type called class or hero
export const availableHeros: Array<PlayerStats> = [
  {
    name: 'Mage',
    maxHP: 90,
    currentHP: 0,
    attackDamage: 10,
    isNPC: false,
    potionCount: 3,
    abilityCooldown: 5,
    killCount: 0,
  },
  {
    name: 'Warrior',
    maxHP: 150,
    currentHP: 0,
    attackDamage: 30,
    isNPC: false,
    potionCount: 3,
    abilityCooldown: 7,
    killCount: 0,
  },
];

// MobStats is the return type
export function spawnMob(): MobStats {
  const enemy = availableEnemies[Rand(availableEnemies.length - 1)];
  enemy.currentHP = enemy.maxHP;
  return enemy;
}

export const potionHealAmount = 30;
