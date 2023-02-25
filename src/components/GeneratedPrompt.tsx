import {
  useTransition,
  a,
  useSpring,
  useSpringRef,
  useChain
} from '@react-spring/web';
import React from 'react';
import { Card } from '../App';

interface Props {
  isPromptOpen: boolean;
  setIsPromptOpen: React.Dispatch<React.SetStateAction<boolean>>;
  chosenCards: Card[];
  setchosenCards: React.Dispatch<React.SetStateAction<Card[]>>;
  question: string;
  spreadChoice: number;
}

const GeneratedPrompt: React.FC<Props> = ({
  isPromptOpen,
  question,
  chosenCards,
  spreadChoice
}) => {
  const transitionRef = useSpringRef();
  const transitionOverlay = useTransition(isPromptOpen, {
    ref: transitionRef,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });

  const springRef = useSpringRef();
  const spring = useSpring({
    ref: springRef,
    x: isPromptOpen ? '25%' : '75%'
  });

  console.log(chosenCards);

  useChain([transitionRef, springRef], [0, 1], 100);
  return transitionOverlay(
    (style, item) =>
      item && (
        <a.div style={style} className="generated-prompt">
          <a.div style={spring}>
            My question: {question}
            <br />
            My spread:{' '}
            {spreadChoice === 1
              ? '3 card spread'
              : spreadChoice === 2
              ? '5 card spread'
              : spreadChoice === 3
              ? '10 card eltic spread'
              : null}
            <br />
            Please give a reading based on the following chosen cards and my
            question above:
            <ol>
              {chosenCards.map((card, i) => (
                <li key={i}>
                  {card.name} {card.reversed ? 'reversed' : 'not reversed'}
                </li>
              ))}
            </ol>
          </a.div>
        </a.div>
      )
  );
};

export default GeneratedPrompt;
