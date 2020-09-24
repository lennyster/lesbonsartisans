import React from 'react';
import '../components/Home.css';
import { Box, Button, makeStyles } from '@material-ui/core';
import { Typography } from '@material-ui/core';

const useStyle = makeStyles({
    typography: {
        color: '#fff',
        marginBottom: 20
    },
    button: {
        width: "200px"
    }
})

function Home(props){
    const classes = useStyle();
    return(
        <div className="home" >
            <Box py={5} alignItems="center" display="flex" flexDirection="column" >
                <Typography 
                variant="h1" 
                align="center"
                className={classes.typography}
                >
                    WeSellPhone
                </Typography>
                <Button className={classes.button} size="large" variant="contained" color="secondary" onClick={() => props.history.push('/shop')}>Voir les produits
                </Button>
            </Box>
        </div>
    )
}

export default Home;