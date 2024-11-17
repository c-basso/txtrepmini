import runes from 'runes';

export const stripEmojiInput = (text: string, max: number) => {
    const txt = runes(text.trim());

    if (txt.length > max) {
        return txt.slice(0, max).join('');
    }

    return txt.join('');
}