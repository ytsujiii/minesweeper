export enum FinishStatus {
    completed,
    exploded,
}

export enum Difficulty {
    normal,
    expert,
}

export interface FieldData {
    width: number,
    height: number,
    bombCount: number,
}

export const getFieldData = (difficulty: Difficulty): FieldData => {
    switch(difficulty) {
    case Difficulty.normal:
        return {
            width: 16,
            height: 16,
            bombCount: 40,
        };
    case Difficulty.expert:
        return {
            width: 30,
            height: 16,
            bombCount: 99,
        };
    }
};
