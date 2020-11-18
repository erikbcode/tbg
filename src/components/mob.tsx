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
  margin-right: 1rem;
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

interface ShieldProps {
  currentShield: number;
  maxShield: number;
}

const ShieldHealth = styled.span<ShieldProps>`
  color: ${(props) =>
    props.currentShield / props.maxShield >= 0.5 ? 'blue' : 'gray'};
  margin-right: 1rem;
  font-weight: bold;
`;

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
  if (mob.isNPC === false) {
    // Return data for player
    return (
      <MobStyles>
        <MobName>{`${mob.name}`}</MobName>
        <HPStyles>HP:</HPStyles>
        <MobHealth currentHP={mob.currentHP} maxHP={mob.maxHP}>
          {`${mob.currentHP}/${mob.maxHP} `}
        </MobHealth>
        {mob.name === 'Warrior' && (
          <>
            <HPStyles>Shield: </HPStyles>
            <ShieldHealth
              currentShield={(mob as PlayerStats).shield}
              maxShield={50}
            >
              {`${(mob as PlayerStats).shield}/${50}`}
            </ShieldHealth>
          </>
        )}
        <HPStyles>
          {!mob.isNPC && `Potions: ${(mob as PlayerStats).potionCount}`}
        </HPStyles>
        <HPStyles>
          {`Cooldown: ${Math.max((mob as PlayerStats).abilityCooldown, 0)}`}
        </HPStyles>
      </MobStyles>
    );
  }

  // return data for mob
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
