import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import styled from 'styled-components';
import logo from './logo.svg';
import './App.css';
import { Rand, spawnMob, potionHealAmount } from './game';
import { Message } from './components/message';
import { Fight } from './components/fight';

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
};

function App() {
  // Shown below are hooks. useState() sets the initial value of the variable shown in blue, creates a setter function shown in yellow
  const [messageShowing, setMessageShowing] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [hero, setHero] = useState(initialHero);
  const [currentMob, setCurrentMob] = useState(spawnMob());
  const [isDead, setIsDead] = useState(false);

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

  const handleAttack = () => {
    console.log('attack'); // eslint-disable-line no-console
    const damageDealt = Rand(hero.attackDamage);
    const damageTaken = Rand(currentMob.attackDamage);
    const newMob = {
      ...currentMob,
      currentHP: currentMob.currentHP - damageDealt,
    };
    if (newMob.currentHP > 0) {
      setCurrentMob(newMob);
    }
    const newHero = { ...hero, currentHP: hero.currentHP - damageTaken };
    setHero(newHero);

    let resultsMessage: string;

    if (newHero.currentHP < 1) {
      resultsMessage = '';
      setIsDead(true);
    } else if (newMob.currentHP < 1) {
      // Functionality I added
      resultsMessage = `You killed ${newMob.name}! They dealt ${damageTaken} damage to you before dying.`;
      setCurrentMob(spawnMob());
      const potionCheck = Rand(4);
      if (potionCheck === 0) {
        // 20% chance to spawn a potion
        resultsMessage += ` ${newMob.name} dropped a potion.`;
        newHero.potionCount += 1;
      }
    } else {
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

  const handleRun = () => {
    let resultsMessage: string;
    console.log('run'); // eslint-disable-line no-console
    resultsMessage = 'You run like a coward!';
    const newMob = spawnMob();
    setCurrentMob(newMob);
    // Why does the following line result in previous mob's name, without the line 'const newMob = spawnMob()' above? IE setCurrentMob(spawnMob()) did not result in currentMob being changed
    resultsMessage += ` A ${newMob.name} has found you!`;

    setStatusMessage(resultsMessage);
    setMessageShowing(true);
  };

  const handlePotion = () => {
    console.log(`potion ${hero.potionCount}`); // eslint-disable-line no-console

    if (hero.potionCount < 1) {
      setStatusMessage(`You are out of potions!`);
    } else if (hero.currentHP === hero.maxHP) {
      setStatusMessage('You are already at full HP!');
    } else {
      let healFor = potionHealAmount;

      healFor = Math.min(healFor, hero.maxHP - hero.currentHP);
      const newHero = {
        ...hero, /// what does ... do in this?
        currentHP: hero.currentHP + healFor,
        potionCount: hero.potionCount - 1,
      };
      setHero(newHero);
      setStatusMessage(`You heal yourself for ${healFor} points!`);
    }
    setMessageShowing(true);
  };

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
            onAttack={handleAttack}
            onRun={handleRun}
            onPotion={handlePotion}
          />
        )}

        {messageShowing && <Message message={statusMessage} />}
        <a href="/">Start Over</a>
      </div>
    </Router>
  );
}

export default App;
