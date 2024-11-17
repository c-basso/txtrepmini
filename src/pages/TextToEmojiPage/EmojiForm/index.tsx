import { Button, Cell, List, Section, Switch, Textarea, Text, Input } from '@telegram-apps/telegram-ui';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { ResultModal } from '@/components/ResultModal';
import runes from 'runes';

import { converter } from './converter';
import { stripTextInput } from './stripTextInput';
import { stripEmojiInput } from './stripEmojiInput';

const TEXT_FREE_MAX_LEN = 100;
const TEXT_PREMIUM_MAX_LEN = 1000;
const EMOJI_MAX_LEN = 10;

const premium = false;

export const EmojiForm = () => {
    const [text, setText] = useState('');
    const [emoji, setEmoji] = useState('');
    const [isRandom, setIsRandom] = useState(false);
    const [result, setResult] = useState('');

    const [maxText, setMaxText] = useState(premium ? TEXT_PREMIUM_MAX_LEN : TEXT_FREE_MAX_LEN);

    const [showResult, setShowResult] = useState(false);
    const [submitDisabled, setSubmitDisabled] = useState(true);

    const onChangeText = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const newText = event.target.value;
        const value = stripTextInput(newText);
        setText(value);
    }, []);

    const onChangeEmoji = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const newText = event.target.value;
        const value = stripEmojiInput(newText, EMOJI_MAX_LEN);
        setEmoji(value);
    }, []);

    const onChangeRandom = useCallback(() => {
        setIsRandom((value) => !value);
    }, []);

    const onSubmit = useCallback(() => {
        setResult(converter(emoji, text, isRandom));
        setShowResult(true);
    }, [text, emoji, isRandom]);

    useEffect(() => {
        const invalid = (txt: string) => !(txt && txt.length);
        setSubmitDisabled(invalid(text) || invalid(emoji));
    }, [text, emoji]);

    useEffect(() => {
        setMaxText(premium ? TEXT_PREMIUM_MAX_LEN : TEXT_FREE_MAX_LEN);
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
                                Characters left: {EMOJI_MAX_LEN - runes(emoji).length}
                            </Text>
                        </div>
                    }
                >
                    <Input
                        placeholder='Write emoji here 😊😌😙😜'
                        value={emoji}
                        onChange={onChangeEmoji}
                    />
                </Section>

                {emoji.length > 1 && (
                    <Section>
                        <Cell
                            Component='label'
                            after={<Switch onChange={onChangeRandom} />}
                            multiline
                        >
                            Random place emoji
                        </Cell>
                    </Section>
                )}

                <Section>
                    <div
                        style={{ display: 'flex', justifyContent: 'flex-end' }}
                    >
                        <Button
                            onClick={onSubmit}
                            disabled={submitDisabled}
                        >Convert</Button>
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
