import runes from 'runes';
import {config} from './config';
import { randomItem } from '../../../helpers/randomItem';

const keys = Object.keys(config);

export const converter = (
    emoji: string,
    text: string,
    isRandom: boolean
) => {
    const filtered = text
        .toUpperCase()
        .split('')
        .filter((key) => keys.includes(key));

    const result: string[] = [];

    filtered.forEach((key) => {
        const item: string[] = [];

        config[key].split('').forEach((sym) => {
            if (sym === '*') {
                const emo = isRandom ? randomItem(runes(emoji)) : emoji;
                item.push(emo);
            } else {
                item.push(sym);
            }
        });

        result.push(item.join(''));
    });

    return result.join('');
};

