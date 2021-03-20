import React, { useCallback, useState } from 'react';
import { AppBar, Button, Container, makeStyles, Menu, MenuItem } from '@material-ui/core';
import Game from './Game';
import { Difficulty, FieldData, getFieldData } from './types/Game';

const useStyles = makeStyles({
    mainContainer: {
        marginTop: '40px',
        display: 'flex',
        justifyContent: 'center',
    },
});

export default function App(): React.ReactElement {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [field, setField] = useState<FieldData>(getFieldData(Difficulty.normal));
    const onDifficultySelected = useCallback((newDifficulty: Difficulty) => {
        setAnchorEl(null);
        setField(getFieldData(newDifficulty));
    }, []);
    return (
        <>
            <AppBar position="static" color="default">
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={(e) => setAnchorEl(e.currentTarget)}>
                    Difficulty
                </Button>
                <Menu
                    id="difficulty-menu"
                    keepMounted
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <MenuItem onClick={() => onDifficultySelected(Difficulty.normal)}>Normal</MenuItem>
                    <MenuItem onClick={() => onDifficultySelected(Difficulty.expert)}>Expert</MenuItem>
                </Menu>
            </AppBar>
            <Container className={classes.mainContainer}>
                <Game field={field}/>
            </Container>
        </>
    );
}
