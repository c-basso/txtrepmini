import { Button, Cell, List, Section, Slider, Switch, Textarea, Text } from '@telegram-apps/telegram-ui';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { ResultModal } from '@/components/ResultModal';
import runes from 'runes';

const MIN_REPEAT = 2;
const MAX_TEXT_FREE = 100;
const MAX_TEXT_PREMIUM = 1000;
const MAX_REPEAT_FREE = 100;
const MAX_REPEAT_PREMIUM = 100;

const premium = false;

export const RepeatForm = () => {
    const [text, setText] = useState('');
    const [result, setResult] = useState('');
    const [count, setCount] = useState(MIN_REPEAT);
    const [showResult, setShowResult] = useState(false);
    const [inserNewLine, setInserNewLine] = useState(false);
    const [submitDisabled, setSubmitDisabled] = useState(true);

    const [maxText] = useState(premium ? MAX_TEXT_PREMIUM : MAX_TEXT_FREE);
    const [maxRepeat] = useState(premium ? MAX_REPEAT_PREMIUM : MAX_REPEAT_FREE);

    const onChangeText = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const newText = event.target.value;
        setText(newText);
        setSubmitDisabled(!(newText && newText.length));
    }, []);

    const onChangeCount = useCallback((value: number) => {
        setCount(Math.round(value));
    }, []);

    const onChangeInserNewLine = useCallback(() => {
        setInserNewLine((value) => !value);
    }, []);

    const onSubmit = useCallback(() => {
        Promise.resolve()
            .then(async () => {
                const resultArray: string[] = [];

                let i = count;

                while (i > 0) {
                    resultArray.push(text);
                    i--;
                }

                return resultArray.join(inserNewLine ? '\n' : ' ');
            })
            .then((result) => {
                setResult(result);
                setShowResult(true);
            });
    }, [text, count, inserNewLine]);

    useEffect(() => {
        console.log(result);
    }, [result]);

    return (
        <>
            <List>
                <Section
                    footer={
                        <div
                            style={{
                                padding: '0 20px',
                                textAlign: 'right'
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 12
                                }}
                            >
                                Characters left: {maxText - runes(text).length}
                            </Text>
                        </div>
                    }
                >
                    <Textarea
                        placeholder='Text to repeat'
                        value={text}
                        onChange={onChangeText}
                        maxLength={maxText}
                    />
                </Section>
                <Section header={`Repeat times ${count}`}>
                    <Slider
                        min={MIN_REPEAT}
                        max={maxRepeat}
                        step={1}
                        onChange={onChangeCount}
                        multiple={false}
                        value={count}
                    />
                </Section>

                <Section>
                    <Cell
                        Component='label'
                        after={<Switch onChange={onChangeInserNewLine} />}
                        multiline
                    >
                        Insert new line
                    </Cell>
                </Section>

                <Section>
                    <div
                        style={{display: 'flex', justifyContent: 'flex-end'}}
                    >
                        <Button
                            onClick={onSubmit}
                            disabled={submitDisabled}
                        >Repeat</Button>
                    </div>
                </Section>
            </List>

            <ResultModal
                result={result}
                showResult={showResult}
                setShowResult={setShowResult}
            />
        </>
    );
}