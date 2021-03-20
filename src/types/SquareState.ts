export enum SquareState {
    zero,
    one,
    two,
    three,
    four,
    five,
    six,
    seven,
    eight,
    hidden,
    bomb,
    flagged,
    bombHidden,
    bombFlagged,
    bombExploded,
    flaggedIncorrect,
}

export const toSquareState = (bombCount: number): SquareState => {
    switch(bombCount) {
    case 0: return SquareState.zero;
    case 1: return SquareState.one;
    case 2: return SquareState.two;
    case 3: return SquareState.three;
    case 4: return SquareState.four;
    case 5: return SquareState.five;
    case 6: return SquareState.six;
    case 7: return SquareState.seven;
    case 8: return SquareState.eight;
    default: return SquareState.hidden;
    }
};

export const getSquareStateChar = (state: SquareState): string => {
    switch(state) {
    case SquareState.zero: return ' ';
    case SquareState.one: return '1';
    case SquareState.two: return '2';
    case SquareState.three: return '3';
    case SquareState.four: return '4';
    case SquareState.five: return '5';
    case SquareState.six: return '6';
    case SquareState.seven: return '7';
    case SquareState.eight: return '8';
    case SquareState.hidden: return ' ';
    case SquareState.bomb: return 'B';
    case SquareState.flagged: return 'F';
    case SquareState.bombHidden: return ' ';
    case SquareState.bombFlagged: return 'F';
    case SquareState.bombExploded: return 'B';
    case SquareState.flaggedIncorrect: return 'F';
    default: return ' ';
    }
};

export const isOpened = (state: SquareState): boolean => {
    return state !== SquareState.hidden
        && state !== SquareState.bombHidden
        && state !== SquareState.flagged
        && state !== SquareState.bombFlagged
        && state !== SquareState.bomb
        && state !== SquareState.flaggedIncorrect;
};

export const isFlagged = (state: SquareState): boolean => {
    return state === SquareState.flagged
        || state === SquareState.bombFlagged;
};
