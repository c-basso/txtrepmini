export const randomItem = (items: any[]) => {
    return items[Math.floor(Math.random() * items.length)];
}