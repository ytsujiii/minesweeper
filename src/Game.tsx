import React, { useCallback, useEffect, useState } from 'react';
import Square from './Square';
import { isFlagged, isOpened, SquareState, toSquareState } from './types/SquareState';
import { Button, makeStyles, Typography } from '@material-ui/core';
import { Coord, toCoord } from './types/Coordinate';
import { FieldData, FinishStatus } from './types/Game';

const useStyles = makeStyles({
    row: {
        display: 'flex',
    },
    messagesRow: {
        display: 'flex',
    },
    finishMessage: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: '20px',
    },
});

interface Props {
    field: FieldData,
}

export default function Game(props: Props): React.ReactElement {
    const classes = useStyles();
    const { field } = props;
    const [finishMessage, setFinishMessage] = useState<string | null>(null);
    const [inGame, setInGame] = useState<boolean>(false);
    const [restSquareCount, setRestSquareCount] = useState<number>(0);
    const [firstClickedCoord, setFirstClickedCoord] = useState<Coord | null>(null);
    const [squareStates, setSquareStates] = useState<Array<Array<SquareState>> | null>(null);
    const onLeftClick = useCallback((e: React.MouseEvent<HTMLElement>, coord: Coord) => {
        if (!squareStates) {
            return;
        } else if (!inGame) {
            return;
        }
        if (!firstClickedCoord) {
            putBombs(coord);
            setFirstClickedCoord(coord);
            return;
        } else if (isOpened(squareStates[coord.y][coord.x]) || isFlagged(squareStates[coord.y][coord.x])) {
            return;
        }
        openSquare(coord, squareStates);
    }, [squareStates, inGame]);
    const onRightClick = useCallback((e: React.MouseEvent<HTMLElement>, coord: Coord) => {
        e.preventDefault();
        if (!inGame) {
            return;
        } else if (!firstClickedCoord) {
            return;
        }
        toggleFlagSquare(coord);
    }, [inGame, firstClickedCoord]);
    const toggleFlagSquare = useCallback((coord: Coord): void => {
        if (!squareStates) {
            return;
        }
        const newSquareStates = squareStates.slice();
        if (squareStates[coord.y][coord.x] === SquareState.hidden) {
            newSquareStates[coord.y][coord.x] = SquareState.flagged;
        } else if (squareStates[coord.y][coord.x] === SquareState.bombHidden) {
            newSquareStates[coord.y][coord.x] = SquareState.bombFlagged;
        } else if (squareStates[coord.y][coord.x] === SquareState.flagged) {
            newSquareStates[coord.y][coord.x] = SquareState.hidden;
        } else if (squareStates[coord.y][coord.x] === SquareState.bombFlagged) {
            newSquareStates[coord.y][coord.x] = SquareState.bombHidden;
        }
        setSquareStates(newSquareStates);
    }, [squareStates]);
    const isValidCoord = (coord: Coord): boolean => {
        return 0 <= coord.y && coord.y < field.height
            && 0 <= coord.x && coord.x < field.width;
    };
    const getAroundBombCount = useCallback((coord: Coord): number => {
        if (!squareStates) {
            return 0;
        }
        let bombCount = 0;
        [-1, 0, 1].forEach((dy) => {
            [-1, 0, 1].forEach((dx) => {
                if (dy === 0 && dx === 0) {
                    return;
                }

                const newCoord = toCoord(coord.y + dy, coord.x + dx);
                if (!isValidCoord(newCoord)) {
                    return;
                }

                if (squareStates[coord.y + dy][coord.x + dx] === SquareState.bombHidden || squareStates[coord.y + dy][coord.x + dx] === SquareState.bombFlagged) {
                    bombCount++;
                }
            });
        });
        return bombCount;
    }, [squareStates]);
    const openSquare = useCallback((coord: Coord, newSquareStates: Array<Array<SquareState>>): void => {
        let openedSquareCount = 0;
        const recur = (coord: Coord, newSquareStates: Array<Array<SquareState>>) => {
            if (newSquareStates[coord.y][coord.x] === SquareState.bombHidden) {
                newSquareStates[coord.y][coord.x] = SquareState.bombExploded;
                onFinished(FinishStatus.exploded);
                return;
            } else if (newSquareStates[coord.y][coord.x] === SquareState.hidden) {
                openedSquareCount++;
                const aroundBombCount = getAroundBombCount(coord);
                newSquareStates[coord.y][coord.x] = toSquareState(aroundBombCount);
                if (aroundBombCount === 0) {
                    [-1, 0, 1].forEach((dy) => {
                        [-1, 0, 1].forEach((dx) => {
                            if (dy === 0 && dx === 0) {
                                return;
                            }
                            const newCoord = toCoord(coord.y + dy, coord.x + dx);
                            if (!isValidCoord(newCoord)) {
                                return;
                            } else if (newSquareStates[coord.y + dy][coord.x + dx] !== SquareState.hidden) {
                                return;
                            }
                            recur(newCoord, newSquareStates);
                        });
                    });
                }
            }
        };
        recur(coord, newSquareStates);
        setRestSquareCount(restSquareCount - openedSquareCount);
        setSquareStates([...newSquareStates]);
    }, [squareStates, getAroundBombCount, restSquareCount]);
    const init = useCallback((): void => {
        const stateArray = Array.from(Array(field.height), () => {
            return Array.from(Array(field.width), () => SquareState.hidden);
        });
        setSquareStates(stateArray);
        setRestSquareCount(field.width * field.height - field.bombCount);
        setFirstClickedCoord(null);
        setInGame(true);
        setFinishMessage(null);
    }, [field]);
    const putBombs = useCallback((except: Coord): void => {
        const stateArray = Array.from(Array(field.height), () => {
            return Array.from(Array(field.width), () => SquareState.hidden);
        });
        const possibleBombLocations: Array<number> = Array.from(Array(field.height * field.width), (_, i) => i)
            .filter((_, i) => i !== field.height * except.y + except.x);
        [...Array(field.bombCount)].forEach(() => {
            const bombLocation = possibleBombLocations.splice(Math.random() * possibleBombLocations.length, 1)[0];
            stateArray[Math.floor(bombLocation / field.width)][bombLocation % field.width] = SquareState.bombHidden;
        });
        setSquareStates(stateArray);
    }, [field]);
    const onFinished = useCallback((finishStatus: FinishStatus) => {
        if (!squareStates) {
            return;
        }
        const finalSquareStates = squareStates.slice();
        Array.from(Array(field.height), (_, i) => i).forEach((y) => {
            Array.from(Array(field.width), (_, i) => i).forEach((x) => {
                if (finalSquareStates[y][x] === SquareState.bombHidden) {
                    finalSquareStates[y][x] = finishStatus === FinishStatus.completed
                        ? SquareState.bombFlagged
                        : SquareState.bomb;
                } else if (finalSquareStates[y][x] === SquareState.flagged) {
                    finalSquareStates[y][x] = SquareState.flaggedIncorrect;
                }
            });
        });
        if (finishStatus === FinishStatus.exploded) {
            setFinishMessage('Boooooom!');
        } else if (finishStatus === FinishStatus.completed) {
            setFinishMessage('Completed!');
        }
        setSquareStates(finalSquareStates);
        setInGame(false);
    }, [squareStates]);

    useEffect(() => {
        init();
    }, [field]);
    useEffect(() => {
        if (!firstClickedCoord || !squareStates) {
            return;
        }
        openSquare(firstClickedCoord, squareStates);
    }, [firstClickedCoord]);
    useEffect(() => {
        if (restSquareCount === 0) {
            onFinished(FinishStatus.completed);
        }
    }, [restSquareCount]);
    return (
        <div className="App">
            <Button onClick={init} color="primary" variant="contained">Start</Button>
            <div className={classes.messagesRow}>
                <Typography>Blocks remaining: {restSquareCount}</Typography>
                <div className={classes.finishMessage}>{finishMessage}</div>
            </div>
            {squareStates && Array.from(Array(field.height)).map((_, y) => (
                <div key={y} className={classes.row}>
                    {Array.from(Array(field.width)).map((_, x) => (
                        <Square
                            key={x}
                            state={squareStates[y][x]}
                            onLeftClick={(e) => onLeftClick(e, toCoord(y, x))}
                            onRightClick={(e) => onRightClick(e, toCoord(y, x))}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}