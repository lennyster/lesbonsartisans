import Axios from 'axios';
import React, { useState } from 'react';
import { Box,  Grid, makeStyles,  TextField, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles(() => ({
    root: {
      flexGrow: 1,
    },
    leftColumn:{
        padding: 20, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center'
    },
    input: {
        marginBottom: 20
    }
    ,
    form: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 20,
        marginTop: 20
    },
    buttonForm: {
        width: 300, 
        marginTop: 40,
        marginBottom: 40
    }
}));

function User(props){
    const classes = useStyles();
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [success, setSuccess] = useState('none');
    const [error, setError] = useState('none')
    const [errorLogin, setErrorLogin] = useState('none')

    const registerUser = () => {

        const body = {
            email: registerEmail,
            password: registerPassword,
        }

        if(body.email === '') setError('');
        else if(body.password === '') setError('');
        else {
            setError('none')
        }
    
        const link = `http://localhost:96/api/users/`

        Axios.post(link, body)
        .then((data) => {
            if(data.status === 200) {
                localStorage.setItem('token', data.data.token);
                setSuccess('');
                setRegisterEmail('');
                setRegisterPassword('');
                window.location.replace("/");
            }
        })
        .catch((err) => {
            setError('')
            return
        })
        
    }

    const loginUser = () => {

        const body = {
            email: loginEmail,
            password: loginPassword,
        }

        if(body.email === '') setErrorLogin('');
        else if(body.password === '') setErrorLogin('');
        else {
            setError('none')
        }
    
        const link = `http://localhost:96/api/auth/`

        Axios.post(link, body)
        .then((data) => {
            if(data.status === 200) {
                localStorage.setItem('token', data.data.token);
                window.location.replace("/");
            }
        })
        .catch((err) => {
            setError('')
            return
        })
        
    }

    return(
        <>
            <div className={classes.root}>
            <Grid container spacing={0}>
            <Grid item xs={12} sm={6} className={classes.leftColumn}>
                <Typography variant="h2" align="center">
                        Inscription
                </Typography>
                <Box className={classes.form}>
                    <TextField className={classes.input} required label='Email' type="email" variant="outlined" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} />
                    <TextField className={classes.input} required label='Prix' type="password" variant="outlined" value={registerPassword}  onChange={(e) => setRegisterPassword(e.target.value)} />
                </Box>
                <Button variant="outlined" color="primary" onClick={() => registerUser()} className={classes.buttonForm}>
                    S'inscrire
                </Button>
                <Alert severity="success" style={{ display: success }}> Inscription validé !</Alert>
                <Alert severity="error" style={{ display: error }}>Veuillez verifier tous les champs !</Alert>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.leftColumn}>
                <Typography variant="h2" align="center">
                        Connexion
                </Typography>
                <Box className={classes.form}>
                    <TextField className={classes.input} type='email' required label='E-mail' variant="outlined" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                    <TextField className={classes.input} required label='Mot de passe' type="password" variant="outlined" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                </Box>

                <Button variant="outlined" color="primary" onClick={() => loginUser()} className={classes.buttonForm}>
                    Se Connecter
                </Button>
                <Alert severity="error" style={{ display: errorLogin }}>Le mot de passe ou l'email est incorrecte !</Alert>
            </Grid>
          </Grid>
        </div>
        </>
    )
}

export default User;