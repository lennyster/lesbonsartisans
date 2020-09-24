/* eslint-disable no-unused-vars */
import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(4),
        position: 'absolute',
        top: theme.spacing(5)
    }
}))


export default function DialogComponent(props){

    const { title, content, openDialog, setOpenDialog, setCloseDialog, validForm } = props;
    const classes = useStyles();

    return (
        <Dialog open={openDialog}  maxWidth="md" className={classes.dialogWrapper}>
            <DialogTitle>
                {title}
            </DialogTitle>
            <DialogContent>
                    {content}
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick = {setCloseDialog}  color="primary">
                    ANNULER
                </Button>
                <Button color="primary" onClick = {validForm}>
                    CONFIRMER
                </Button>
            </DialogActions>
        </Dialog>
    )
}