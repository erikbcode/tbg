import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import styled from 'styled-components';
import logo from './logo.svg';
import './App.css';
import { Rand, spawnMob, potionHealAmount, spawnHero } from './game';
import { Message } from './components/message';
import { Fight } from './components/fight';
import { Select } from './class-select/select';

const HeaderStyled = styled.header`
  background-color: #282c34;
  min-height: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

// JavaScript object
const initialHero = {
  name: 'Erik',
  maxHP: 100,
  currentHP: 100,
  attackDamage: 50,
  isNPC: false,
  potionCount: 3,
  abilityCooldown: 0,
  killCount: 0,
  abilityName: 'none',
};

function App() {
  // Shown below are hooks. useState() sets the initial value of the variable shown in blue, creates a setter function shown in yellow
  const [messageShowing, setMessageShowing] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [hero, setHero] = useState(initialHero);
  const [currentMob, setCurrentMob] = useState(spawnMob());
  const [isDead, setIsDead] = useState(false);
  const [heroSelected, setHeroSelected] = useState(false);

  // useEffect allows us to implement a timer on the messageShowing, so that it only appears for 2 seconds
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (messageShowing) {
      // What is the syntax on the next line?
      const timer = setTimeout(() => {
        setMessageShowing(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [messageShowing]);

  // Class selections for player
  const handleMage = () => {
    const newHero = spawnHero(0);
    setHeroSelected(true);
    setHero(newHero);
  };

  const handleWarrior = () => {
    const newHero = spawnHero(1);
    setHeroSelected(true);
    setHero(newHero);
  };

  const handleAbility = () => {
    let resultsMessage = '';
    console.log('ability'); // eslint-disable-line no-console
    if (hero.name === 'Mage') {
      const damageDealt = 50;
      const newMob = {
        ...currentMob,
        currentHP: currentMob.currentHP - damageDealt,
      };
      setCurrentMob(newMob);
      const newHero = {
        ...hero,
        abilityCooldown: 10,
      };
      setHero(newHero);
      resultsMessage = `You hit the ${currentMob.name} with a fireball for 50 damage!`;
    } else if (hero.name === 'Warrior') {
      // TODO
    }
    setStatusMessage(resultsMessage);
    setMessageShowing(true);
  };
  /*
  handleAttack calculates random damage numbers for both the player and mob based on their attackDamage values. 
  The mob and player's HP numbers are changed to reflect the attacks. A new mob is respawned or the game ends if needed.
  Potions have a random chance of dropping for the player on mob death.
  */
  const handleAttack = () => {
    console.log('attack'); // eslint-disable-line no-console
    const damageDealt = Rand(hero.attackDamage);
    const damageTaken = Rand(currentMob.attackDamage);
    // Reflect HP change for mob and player
    const newMob = {
      ...currentMob,
      currentHP: currentMob.currentHP - damageDealt,
    };
    setCurrentMob(newMob);
    const newHero = {
      ...hero,
      currentHP: hero.currentHP - damageTaken,
      abilityCooldown: hero.abilityCooldown - 1,
    };
    setHero(newHero);
    // Message to be output when button is clicked and actions are taken.
    let resultsMessage: string;
    // If player is dead, isDead set to true resulting in buttons and fight section no longer being drawn.
    if (newHero.currentHP < 1) {
      resultsMessage = '';
      setIsDead(true); // End the game
    } else if (newMob.currentHP < 1) {
      // Player is not dead but mob is:
      resultsMessage = `You killed ${newMob.name}! They dealt ${damageTaken} damage to you before dying.`;
      setCurrentMob(spawnMob()); // Spawn a new mob
      // Add a potion 20% of the time a mob is killed
      const potionCheck = Rand(4);
      if (potionCheck === 0) {
        resultsMessage += ` ${newMob.name} dropped a potion.`;
        newHero.potionCount += 1;
      }
    } else {
      // Player and mob are both alive
      const myDamageMessage =
        damageDealt < 1
          ? `You miss the ${currentMob.name}`
          : `You strike the ${currentMob.name} for ${damageDealt} damage.`;

      const theirDamageMessage =
        damageTaken < 1
          ? `The ${currentMob.name} misses you.`
          : `You receive  ${damageTaken} damage in retaliation.`;

      resultsMessage = `${myDamageMessage} ${theirDamageMessage}`;
    }

    setStatusMessage(resultsMessage);
    setMessageShowing(true);
  };

  // handleRun allows the player to spawn a new mob with full HP.
  const handleRun = () => {
    let resultsMessage: string;
    console.log('run'); // eslint-disable-line no-console
    resultsMessage = 'You run like a coward!';
    const newMob = spawnMob();
    setCurrentMob(newMob);
    const newHero = {
      ...hero,
      abilityCooldown: hero.abilityCooldown - 1,
    };
    setHero(newHero);
    // Why does the following line result in previous mob's name, without the line 'const newMob = spawnMob()' above? IE setCurrentMob(spawnMob()) did not result in currentMob being changed
    resultsMessage += ` A ${newMob.name} has found you!`;

    setStatusMessage(resultsMessage);
    setMessageShowing(true);
  };

  // handlePotion allows the player to use a potion, assuming they have one. The potion heals for a certain amount based on healFor variable
  const handlePotion = () => {
    console.log(`potion ${hero.potionCount}`); // eslint-disable-line no-console

    let healFor = potionHealAmount;

    healFor = Math.min(healFor, hero.maxHP - hero.currentHP);
    const newHero = {
      // ... sets values of newHero to those of old hero, operations below set specific variables to new values
      ...hero,
      currentHP: hero.currentHP + healFor,
      potionCount: hero.potionCount - 1,
      abilityCooldown: hero.abilityCooldown - 1,
    };

    setHero(newHero);
    setStatusMessage(`You heal yourself for ${healFor} points!`);
    setMessageShowing(true);
  };
  // if hero selected, draw game otherwise draw class selection
  if (heroSelected) {
    return (
      <Router>
        <div className="App">
          <HeaderStyled>
            <img src={logo} className="App-logo" alt="logo" />
            <p>{`Welcome to the Dungeon ${hero.name}!`}</p>
          </HeaderStyled>
          {isDead ? (
            <h2>YOU DIED. Click Start Over below to continue.</h2>
          ) : (
            <Fight
              mob={currentMob}
              hero={hero}
              buttonsDisabled={messageShowing}
              potionDisabled={
                hero.potionCount < 1 || hero.maxHP === hero.currentHP
              }
              abilityDisabled={hero.abilityCooldown > 0}
              onAttack={handleAttack}
              onRun={handleRun}
              onPotion={handlePotion}
              onAbility={handleAbility}
            />
          )}

          {messageShowing && <Message message={statusMessage} />}
          <a href="/">Start Over</a>
        </div>
      </Router>
    );
  }

  return (
    <Router>
      <div className="App">
        <HeaderStyled>
          <img src={logo} className="App-logo" alt="logo" />
          <p>{`Welcome to the Dungeon ${hero.name}!`}</p>
        </HeaderStyled>
        <h3>Select Your Class!</h3>
        <Select onMage={handleMage} onWarrior={handleWarrior} />
      </div>
    </Router>
  );
}

export default App;
