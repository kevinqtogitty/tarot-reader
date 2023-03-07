import React, { useEffect, useState } from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import { a, useTransition } from '@react-spring/web';

interface Props {
  isDialogActive: boolean;
  setIsDialogActive: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setSpreadChoice: React.Dispatch<React.SetStateAction<number>>;
  setQuestion: React.Dispatch<React.SetStateAction<string>>;
  question: string;
}

const choices = [
  {
    type: 'Three card spread',
    tooltip:
      ' Quick and focused readings for gaining insight into a specific question or situation.'
  },
  {
    type: 'Five card spread',
    tooltip:
      'Provides more depth and complexity than the 3-card spread for a detailed analysis of a specific issue or challenge.'
  },
  {
    type: 'Celtic Cross spread',
    tooltip:
      ' A traditional and complex spread for a comprehensive analysis of a situation or question. Best used when you need a detailed and in-depth analysis.'
  }
];

const ChooseYourSpreadDialog: React.FC<Props> = ({
  isDialogActive,
  setIsDialogActive,
  setSpreadChoice,
  setIsLoading,
  question,
  setQuestion
}) => {
  const transition = useTransition(isDialogActive, {
    from: { opacity: 0, transform: 'translateY(100%)' },
    enter: { opacity: 1, transform: 'translateY(0%)' },
    leave: { opacity: 0, transform: 'translateY(100%)' }
  });

  const log = (e: any) => {
    if (question.length) {
      const value = Number(e.target.value);
      setIsDialogActive((state) => !state);
      setIsLoading((state) => !state);
      setSpreadChoice(value);
    } else {
      console.log('No question entered');
    }
  };

  const ChoiceAndTooltip = (props: {
    valueKey: number;
    choice: { type: string; tooltip: string };
  }) => (
    <Tooltip.Provider skipDelayDuration={0}>
      <Tooltip.Root>
        <Tooltip.Trigger value={props.valueKey} onClick={(e) => log(e)}>
          {props.choice.type}
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="tooltip-content"
            sideOffset={10}
            side={'bottom'}
          >
            {props.choice.tooltip}
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );

  return (
    <>
      {transition(
        (spring, item) =>
          item && (
            <a.section style={spring} className="choose-your-spread-dialog">
              <h2>Enter your question and choose your spread</h2>
              <div>
                <label htmlFor="inquiry" hidden />
                <input
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
              </div>
              <div>
                {choices.map((choice, i) => (
                  <ChoiceAndTooltip valueKey={i + 1} choice={choice} />
                ))}
              </div>
            </a.section>
          )
      )}
    </>
  );
};

export default ChooseYourSpreadDialog;
