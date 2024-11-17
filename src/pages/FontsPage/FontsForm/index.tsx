import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import runes from 'runes';

import { convert } from './converter';
import { ResultModal } from '../../../components/ResultModal';
import { Button, List, Section, Select, Text, Textarea } from '@telegram-apps/telegram-ui';

const MAX_FREE = 100;
const MAX_PREMIUM = 1000;
const premium = false;

export const FontsForm = () => {
    const [text, setText] = useState('');
    const [font, setFont] = useState('Circle');
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

    const onChangeFont = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setFont(value);
    }, []);

    const onSubmit = useCallback(() => {
        setResult(convert(text, font));
        setShowResult(true);
    }, [text, font]);

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
                        placeholder='Supported characters are A-Z, a-z'
                        value={text}
                        onChange={onChangeText}
                        maxLength={maxText}
                    />
                </Section>

                <Section header='Font'>
                    <Select
                        value={font}
                        onChange={onChangeFont}
                    >
                        <option value='Circle'>{convert('Circle', 'Circle')}</option>
                        <option value='Square'>{convert('Square', 'Square')}</option>
                        <option value='Old'>{convert('Old', 'Old')}</option>
                        <option value='Runic'>{convert('Runic', 'Runic')}</option>
                        <option value='Random'>{convert('Random', 'Random')}</option>
                    </Select>
                </Section>

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
