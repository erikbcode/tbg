import React, { FunctionComponent } from 'react';
import { MobStats, PlayerStats } from '../game';
import { FightStatus } from './fight-status';
import { FightChoices } from './fight-choices';

export interface FightProps {
  hero: PlayerStats;
  mob: MobStats;
  buttonsDisabled?: boolean;
  onAttack: () => void;
  onPotion: () => void;
  onRun: () => void;
}

export const Fight: FunctionComponent<FightProps> = ({
  hero,
  mob,
  buttonsDisabled,
  onAttack,
  onRun,
  onPotion,
}) => {
  return (
    <div>
      <FightStatus mob={mob} hero={hero} />
      <FightChoices
        disabled={buttonsDisabled}
        onAttack={onAttack}
        onRun={onRun}
        onPotion={onPotion}
      />
    </div>
  );
};

Fight.defaultProps = {
  buttonsDisabled: false,
};
