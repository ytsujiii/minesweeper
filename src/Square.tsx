import React from 'react';
import { getSquareStateChar, isOpened, SquareState } from './types/SquareState';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles({
    square: {
        width: '23px',
        height: '23px',
        border: '1px solid black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    opened: {
        backgroundColor: '#DDDDDD',
    },
    bombExploded: {
        backgroundColor: 'red',
    },
    flaggedIncorrect: {
        color: '#0000FF',
    }
});

interface Props {
    state: SquareState;
    onLeftClick: (e: React.MouseEvent<HTMLElement>) => void;
    onRightClick: (e: React.MouseEvent<HTMLElement>) => void;
}

export default function Square(props: Props): React.ReactElement {
    const classes = useStyles();
    const { state, onLeftClick, onRightClick } = props;
    return (
        <div
            className={clsx(
                classes.square,
                isOpened(state) && classes.opened,
                state === SquareState.bombExploded && classes.bombExploded,
                state === SquareState.flaggedIncorrect && classes.flaggedIncorrect,
            )}
            onClick={onLeftClick}
            onContextMenu={onRightClick}>
            { getSquareStateChar(state) }
        </div>
    );
}
