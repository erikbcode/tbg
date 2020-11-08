import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { MobStats, PlayerStats } from '../game';

const MobStyles = styled.div`
  font-size: 1.5rem;
`;

const HPStyles = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: #023843;
  margin-right: 0.75rem;
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
`;

export interface MobProps {
  mob: MobStats | PlayerStats;
}

export const Mob: FunctionComponent<MobProps> = ({ mob }) => {
  return (
    <MobStyles>
      <MobName>{`${mob.name}`}</MobName>
      <HPStyles>HP:</HPStyles>
      <MobHealth currentHP={mob.currentHP} maxHP={mob.maxHP}>
        {`${mob.currentHP}/${mob.maxHP} `}
      </MobHealth>
      {!mob.isNPC && `Potions: ${(mob as PlayerStats).potionCount}`}
    </MobStyles>
  );
};
