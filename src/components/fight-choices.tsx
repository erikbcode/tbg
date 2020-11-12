import React, { FunctionComponent } from 'react';

export interface FightChoicesProps {
  disabled?: boolean; // ? tells you this var is optional
  potionDisabled?: boolean;
  onAttack: () => void;
  onPotion: () => void;
  onRun: () => void;
}

export const FightChoices: FunctionComponent<FightChoicesProps> = (props) => {
  const { disabled, potionDisabled, onAttack, onPotion, onRun } = props;

  // does the above line make FightChoices into its own function? Or why is it an arrow function?
  return (
    <div>
      <button disabled={disabled} type="button" onClick={onAttack}>
        Attack
      </button>
      <button
        disabled={potionDisabled || disabled}
        type="button"
        onClick={onPotion}
      >
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
  potionDisabled: false,
};

// Below are various ways of writing the same function

interface AddProps {
  a: number;
  b: number;
}

export function add(props: AddProps): number {
  return props.a + props.b;
}

export function addb(props: AddProps): number {
  const { a, b } = props;
  return a + b;
}

export function addc({ a, b }: AddProps): number {
  return a + b;
}

export const add2 = (a: number, b: number): number => {
  return a + b;
};

export const add3 = (a: number, b: number): number => a + b;
