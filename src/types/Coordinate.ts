export interface Coord {
    y: number,
    x: number,
}

export const toCoord = (y: number, x: number): Coord => {
    return { y, x };
};
