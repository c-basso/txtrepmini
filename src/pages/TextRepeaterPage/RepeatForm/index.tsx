import { Button, Cell, List, Modal, Section, Slider, Snackbar, Switch, Textarea } from '@telegram-apps/telegram-ui';
import { ModalHeader } from '@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

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

    const [snak, setSnak] = useState(false);

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

    const onCopyText = () => {
        setShowResult(false);
        setSnak(true);
    }

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
                <Section>
                    <Textarea
                        placeholder="I am usual textarea"
                        value={text}
                        onChange={onChangeText}
                        maxLength={maxText}
                    />
                </Section>
                <Section header="Repeat times">
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

            <Modal
                header={<ModalHeader />}
                open={showResult}
                modal
                dismissible
                onOpenChange={setShowResult}
            >
                <List
                    style={{
                        padding: '0 20px 40px'
                    }}
                >
                    <Section
                        style={{
                            height: '300px',
                            overflow: 'auto'
                        }}
                    >
                        <pre>{result}</pre>
                    </Section>
                    <CopyToClipboard
                        text={result}
                        onCopy={onCopyText}
                    >
                        <Button>Copy</Button>
                    </CopyToClipboard>
                </List>
            </Modal>

            {snak && (
                <Snackbar
                    onClose={() => setSnak(false)}
                >
                    Copied!
                </Snackbar>
            )}
        </>
    );
}