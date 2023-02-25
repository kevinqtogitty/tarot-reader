import {
  a,
  config,
  useTrail,
  useTransition,
  useSpringRef,
  useSpring,
  useChain
} from '@react-spring/web';
import React, { useEffect, useState } from 'react';
import { Card } from '../App';

interface Props {
  isReadingMounted: boolean;
  setIsReadingMounted: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  spreadChoice: number;
  shuffledCards: Card[];
  setShuffledCards: React.Dispatch<React.SetStateAction<Card[]>>;
  shuffleDeck: (array?: Card[]) => void;
  isLoading: boolean;
  isDialogActive: boolean;
}

const Loading: React.FC<Props> = ({
  isLoading,
  setIsLoading,
  setIsReadingMounted,
  spreadChoice,
  shuffledCards,
  setShuffledCards,
  shuffleDeck,
  isDialogActive
}) => {
  const [isUnmounted, setIsUnmounted] = useState(false);
  useEffect(() => {
    if (!isDialogActive) {
      setTimeout(() => {
        setIsLoading(false);
        setIsUnmounted(true);
      }, 6000);
    }
    return;
  }, [isDialogActive]);

  useEffect(() => {
    if (isUnmounted) {
      setIsReadingMounted(true);
    }
    return;
  }, [isUnmounted]);

  const cardsAnimated = shuffledCards.slice(0, 8);

  const transitionRef = useSpringRef();
  const transition = useTransition(isLoading, {
    ref: transitionRef,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });

  const trailRef = useSpringRef();
  const trail = useTrail(cardsAnimated.length, {
    ref: trailRef,
    opacity: isLoading ? 1 : 0,
    config: config.gentle
  });

  const springRef = useSpringRef();
  const spring = useSpring({
    ref: springRef,
    transform: isLoading ? 'rotate(360deg)' : 'rotate(0deg)',
    delay: 1000,
    transformOrigin: 'center'
  });

  useChain([transitionRef, trailRef, springRef]);

  return transition(
    (transition, item) =>
      item && (
        <a.div style={{ ...transition, position: 'fixed' }}>
          <a.div style={spring} className="wheel-of-cards">
            {trail.map((style, i) => (
              <a.img
                style={{
                  transform: `rotate(${i * 45}deg) translate(17rem) rotate(${
                    i * -45
                  }deg)`,
                  ...style
                }}
                key={i}
                src={`${cardsAnimated[i].url}`}
              />
            ))}
          </a.div>
        </a.div>
      )
  );
};

export default Loading;
