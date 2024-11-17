import {config} from './config';

const validSymbols = Object.keys(config);
validSymbols.push(' ');

export const stripTextInput = (text: string) => {
    return text
        .split('')
        .filter((sym) => validSymbols.includes(sym.toUpperCase()))
        .join('')
        .trim();
};