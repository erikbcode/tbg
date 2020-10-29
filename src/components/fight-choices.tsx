import React, { FunctionComponent } from 'react';

export interface FightChoicesProps {
  disabled?: boolean;
  onAttack: () => void;
  onPotion: () => void;
  onRun: () => void;
}

export const FightChoices: FunctionComponent<FightChoicesProps> = ({
  disabled,
  onAttack,
  onPotion,
  onRun,
}) => {
  return (
    <div>
      <button disabled={disabled} type="button" onClick={onAttack}>
        Attack
      </button>
      <button disabled={disabled} type="button" onClick={onPotion}>
        Use Potion
      </button>
      <button disabled={disabled} type="button" onClick={onRun}>
        Run
      </button>
    </div>
  );
};

FightChoices.defaultProps = {
  disabled: false,
};
