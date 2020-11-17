import React, { FunctionComponent } from 'react';
import { ClassChoices } from './select-choices';

export interface SelectProps {
  onMage: () => void;
  onWarrior: () => void;
}
export const Select: FunctionComponent<SelectProps> = ({
  onMage,
  onWarrior,
}) => {
  return (
    <div>
      <ClassChoices onMage={onMage} onWarrior={onWarrior} />
    </div>
  );
};
