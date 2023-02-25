import { useEffect, useState } from 'react';

import data from '../data.json';
import ChooseYourSpreadDialog from './components/ChooseYourSpreadDialog';
import { useTransition } from '@react-spring/web';
import Loading from './components/Loading';
import Reading from './components/Reading';
import React from 'react';
import GeneratedPrompt from './components/GeneratedPrompt';

export interface Card {
  url: string;
  name: string;
  reversed?: boolean;
}

interface Data {
  arcana: Card[];
  cups: Card[];
  swords: Card[];
  wands: Card[];
  pentacles: Card[];
}

function App() {
  const [shuffledCards, setShuffledCards] = useState<Card[]>([]);
  const [chosenCards, setchosenCards] = useState<Card[]>([]);
  const [spreadChoice, setSpreadChoice] = useState(0);
  const [question, setQuestion] = useState('');
  const [isReadingMounted, setIsReadingMounted] = useState(false);
  const [isDialogActive, setIsDialogActive] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isPromptOpen, setIsPromptOpen] = useState(false);
  const cards: Data = data[0].cards;

  useEffect(() => {
    let allCards: Card[] = [];
    Object.keys(cards).forEach((key) => {
      allCards = [...allCards, ...cards[key]];
    });
    shuffleDeck(allCards);
    setShuffledCards(allCards);
    return;
  }, []);

  const shuffleDeck = (array?: Card[]) => {
    if (!array) {
      let array = shuffledCards;
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      setShuffledCards((state) => [...state.slice(78), ...array]);
    } else {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    }
  };

  const dialogProps = {
    isDialogActive,
    setIsDialogActive,
    setSpreadChoice,
    setIsLoading,
    question,
    setQuestion
  };

  const loadingProps = {
    isLoading,
    setIsLoading,
    isReadingMounted,
    setIsReadingMounted,
    spreadChoice,
    shuffledCards,
    setShuffledCards,
    shuffleDeck,
    isDialogActive
  };

  const readingProps = {
    isReadingMounted,
    setIsReadingMounted,
    shuffledCards,
    spreadChoice,
    setSpreadChoice,
    chosenCards,
    setchosenCards
  };

  const PromptProps = {
    isPromptOpen,
    setIsPromptOpen,
    chosenCards,
    setchosenCards,
    question,
    spreadChoice
  };

  return (
    <div className="tarot-card-container">
      <ChooseYourSpreadDialog {...dialogProps} />
      <Loading {...loadingProps} />
      <Reading {...readingProps} />
      <GeneratedPrompt {...PromptProps} />
      <button
        className="prompt-btn"
        onClick={() => setIsPromptOpen((state) => !state)}
      >
        See your prompt
      </button>
    </div>
  );
}

export default App;
