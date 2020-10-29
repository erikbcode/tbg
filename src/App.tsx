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

const initialHero = {
  name: 'Erikker',
  maxHP: 150,
  currentHP: 150,
  attackDamage: 17,
  isNPC: false,
  potionCount: 3,
};

function App() {
  const [messageShowing, setMessageShowing] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [hero, setHero] = useState(initialHero);
  const [currentMob, setCurrentMob] = useState(spawnMob());

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (messageShowing) {
      const timer = setTimeout(() => {
        setMessageShowing(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [messageShowing]);

  const onAttack = () => {
    console.log('attack');
    const damageDealt = Rand(hero.attackDamage);
    const damageTaken = Rand(currentMob.attackDamage);
    const newMob = {
      ...currentMob,
      currentHP: currentMob.currentHP - damageDealt,
    };
    setCurrentMob(newMob);
    const newHero = { ...hero, currentHP: hero.currentHP - damageTaken };
    setHero(newHero);

    let resultsMessage: string;

    if (newHero.currentHP < 1) {
      resultsMessage = 'You died!';
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
  const onRun = () => {
    console.log('run');
    setStatusMessage(`You run like a coward!`);
    setMessageShowing(true);
  };

  const onPotion = () => {
    console.log(`potion ${hero.potionCount}`);

    if (hero.potionCount < 1) {
      setStatusMessage(`You are out of potions!`);
    } else {
      let healFor = potionHealAmount;

      healFor = Math.min(healFor, hero.maxHP - hero.currentHP);
      const newHero = {
        ...hero,
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
        <Fight
          mob={currentMob}
          hero={hero}
          buttonsDisabled={messageShowing}
          onAttack={onAttack}
          onRun={onRun}
          onPotion={onPotion}
        />
        {messageShowing && <Message message={statusMessage} />}
        <a href="/">Start Over</a>
      </div>
    </Router>
  );
}

export default App;
