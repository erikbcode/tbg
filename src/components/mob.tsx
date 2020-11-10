import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { MobStats, PlayerStats } from '../game';

const MobStyles = styled.div`
  font-size: 1.5rem;
`;

const HPStyles = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: #000000;
  margin-right: 0.25rem;
`;

const MobName = styled.span`
  font-weight: bold;
  margin-right: 1rem;
  font-style: italic;
`;

interface HealthProps {
  currentHP: number;
  maxHP: number;
}

// putting <HealthProps> next to span tells you the type of variable that props is
const MobHealth = styled.span<HealthProps>`
  color: ${(props) => (props.currentHP / props.maxHP >= 0.5 ? 'green' : 'red')};
  margin-right: 1rem;
  font-weight: bold;
`;

export interface MobProps {
  mob: MobStats | PlayerStats;
}

// In the below function, why is the line <MobHealth currentHP = {mob.currentHP}... needed if we also call mob.currentHP below?
// What does the line {!mob.isNPC && `potions...} do?
export const Mob: FunctionComponent<MobProps> = ({ mob }) => {
  return (
    <MobStyles>
      <MobName>{`${mob.name}`}</MobName>
      <HPStyles>HP:</HPStyles>
      <MobHealth currentHP={mob.currentHP} maxHP={mob.maxHP}>
        {`${mob.currentHP}/${mob.maxHP} `}
      </MobHealth>
      <HPStyles>
        {!mob.isNPC && `Potions: ${(mob as PlayerStats).potionCount}`}
      </HPStyles>
    </MobStyles>
  );
};
