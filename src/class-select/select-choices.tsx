import React, { FunctionComponent } from 'react';

// Implement functionality similar to fight-choices.tsx but with classes instead of attack, run etc.

export interface ClassChoicesProps {
  onMage: () => void;
  onWarrior: () => void;
}

export const ClassChoices: FunctionComponent<ClassChoicesProps> = ({
  onMage,
  onWarrior,
}) => {
  return (
    <div>
      <button type="button" onClick={onMage}>
        Mage
      </button>
      <button type="button" onClick={onWarrior}>
        Warrior
      </button>
    </div>
  );
};
