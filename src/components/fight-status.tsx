import React, { FunctionComponent } from 'react';
import { MobStats, PlayerStats } from '../game';
import { Mob } from './mob';

export interface FightStatusProps {
  hero: PlayerStats;
  mob: MobStats;
}

export const FightStatus: FunctionComponent<FightStatusProps> = ({
  hero,
  mob,
}) => {
  return (
    <div>
      <Mob mob={hero} />
      <Mob mob={mob} />
    </div>
  );
};
