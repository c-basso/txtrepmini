import { Button, List, Section, Textarea, Text } from '@telegram-apps/telegram-ui';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import runes from 'runes';
import { ResultModal } from '../../../components/ResultModal';

const MAX_FREE = 100;
const MAX_PREMIUM = 1000;
const premium = false;

export const UpperForm = () => {
    const [text, setText] = useState('');
    const [result, setResult] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [submitDisabled, setSubmitDisabled] = useState(true);

    const [maxText, setMaxText] = useState(premium ? MAX_PREMIUM : MAX_FREE);

    const onChangeText = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const newText = event.target.value;
        const value = newText;
        setText(value);
        setSubmitDisabled(!(value && value.length));
    }, []);

    const onSubmitLower = useCallback(() => {
        setResult(text.toLowerCase());
        setShowResult(true);
    }, [text]);

    const onSubmitUpper = useCallback(() => {
        setResult(text.toUpperCase());
        setShowResult(true);
    }, [text]);

    useEffect(() => {
        setMaxText(premium ? MAX_PREMIUM : MAX_FREE);
    }, [premium]);

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
                        placeholder='Your text'
                        value={text}
                        onChange={onChangeText}
                        maxLength={maxText}
                    />
                </Section>

                <Section>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            gap: '20px'
                        }}
                    >
                        <Button
                            onClick={onSubmitLower}
                            disabled={submitDisabled}
                        >Lower</Button>

                        <Button
                            onClick={onSubmitUpper}
                            disabled={submitDisabled}
                        >Upper</Button>
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
};
