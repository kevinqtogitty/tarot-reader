import {
  a,
  useChain,
  useSpring,
  useSpringRef,
  useSprings,
  useTransition
} from '@react-spring/web';
import React, { useEffect, useRef, useState } from 'react';
import { Card } from '../App';

interface Props {
  isReadingMounted: boolean;
  setIsReadingMounted: React.Dispatch<React.SetStateAction<boolean>>;
  shuffledCards: Card[];
  spreadChoice: number;
  setSpreadChoice: React.Dispatch<React.SetStateAction<number>>;
  chosenCards: Card[];
  setchosenCards: React.Dispatch<React.SetStateAction<Card[]>>;
}

const Reading: React.FC<Props> = ({
  isReadingMounted,
  spreadChoice,
  shuffledCards,
  chosenCards,
  setchosenCards
}) => {
  console.log(chosenCards, spreadChoice);

  useEffect(() => {
    if (spreadChoice != 0) {
      spreadChoice === 1
        ? generateRandomCards(3)
        : spreadChoice === 2
        ? generateRandomCards(5)
        : spreadChoice === 3
        ? generateRandomCards(10)
        : null;
    }
  }, [spreadChoice]);

  const transition = useTransition(isReadingMounted, {
    from: { opacity: 0, y: '50%' },
    enter: { opacity: 1, y: '0%' },
    leave: { opacity: 0, y: '50%' },
    delay: 1500
  });

  const springConfigs = [
    {
      key: 0,
      x: isReadingMounted ? '-150%' : '0%',
      delay: 1500
    },
    {
      key: 1,
      x: isReadingMounted ? '0%' : '0%',
      delay: 1500
    },
    {
      key: 2,
      x: isReadingMounted ? '150%' : '0%',
      delay: 1500
    }
  ];

  const spring = useSprings(
    springConfigs.length,
    springConfigs.map(({ key, ...config }) => config)
  );

  const generateRandomCards = (num: number) => {
    let i = 0;
    const randomCards: Card[] = [];
    while (i < num) {
      const randomCard: Card =
        shuffledCards[Math.floor(Math.random() * shuffledCards.length)];
      if (!randomCards.includes(randomCard)) {
        randomCard.reversed = Math.round(Math.random()) === 0 ? false : true;
        randomCards.push(randomCard);
        i++;
      }
    }
    setchosenCards(randomCards);
  };

  if (spreadChoice === 1) {
    return transition(
      (style, item) =>
        item && (
          <a.div className="spread-container" style={{ ...style }}>
            {spring.map((spring, i) => (
              <a.img
                key={springConfigs[i].key}
                className={`tarot-card ${
                  chosenCards[i].reversed ? 'reversed' : 'normal'
                }`}
                style={{ ...spring }}
                src={chosenCards[i].url}
              />
            ))}
          </a.div>
        )
    );
  } else {
    return <></>;
  }
};

export default Reading;
