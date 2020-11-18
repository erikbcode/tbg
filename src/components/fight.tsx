import React, { FunctionComponent } from 'react';
import { MobStats, PlayerStats } from '../game';
import { FightStatus } from './fight-status';
import { FightChoices } from './fight-choices';

export interface FightProps {
  hero: PlayerStats;
  mob: MobStats;
  buttonsDisabled?: boolean;
  potionDisabled?: boolean;
  abilityDisabled?: boolean;
  onAttack: () => void;
  onPotion: () => void;
  onRun: () => void;
  onAbility: () => void;
}

export const Fight: FunctionComponent<FightProps> = ({
  hero,
  mob,
  buttonsDisabled,
  potionDisabled,
  abilityDisabled,
  onAttack,
  onRun,
  onPotion,
  onAbility,
}) => {
  return (
    <div>
      <FightStatus mob={mob} hero={hero} />
      <FightChoices
        disabled={buttonsDisabled}
        potionDisabled={potionDisabled}
        abilityDisabled={abilityDisabled}
        onAttack={onAttack}
        onRun={onRun}
        onPotion={onPotion}
        onAbility={onAbility}
      />
    </div>
  );
};

Fight.defaultProps = {
  buttonsDisabled: false,
  potionDisabled: false,
  abilityDisabled: false,
};
