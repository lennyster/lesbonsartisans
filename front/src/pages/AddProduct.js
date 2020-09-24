import Axios from 'axios';
import React, { useState } from 'react';
import { Box,  Grid, InputLabel, makeStyles, MenuItem,  Select, TextField, Typography } from '@material-ui/core';
import phone from '../assets/img/singleproduct.jpg';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    rightColumn: {
        backgroundImage: `url(${phone})`,
        backgroundSize: 'cover',
        height: 715
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
    editProductButton: {
        width: 300, 
        marginTop: 40,
        marginBottom: 40
    }
}));


function AddProduct(props){

    const classes = useStyles();
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [price, setPrice] = useState('');
    const [warranty_years, setWarranty] = useState('');
    const [success, setSuccess] = useState('none');
    const [error, setError] = useState('none')

    const addProduct = () => {

        const body = {
            name,
            price,
            type,
            warranty_years
        }

        if(body.name === '') setError('');
        else if(body.price === '') setError('');
        else if(body.type === '') setError('');
        else if(body.warranty_years === '') setError('');
        else setError('none')
    
        const link = `http://localhost:96/api/products/create`

        Axios.post(link, body)
        .then((data) => {
            if(data.status === 200) {
                setSuccess('');
                setWarranty('');
                setType('');
                setName('');
                setPrice('');
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return(
        <>
            <div className={classes.root}>
            <Grid container spacing={0}>
            <Grid item xs={12} sm={6} className={classes.leftColumn}>
                <Typography variant="h2" align="center">
                        Ajouter un produit
                </Typography>
                <Box className={classes.form}>
                    <TextField className={classes.input} required label='Nom' variant="outlined" value={name} onChange={(e) => setName(e.target.value)} />
                    <InputLabel style={{ marginBottom: 10 }}>Type</InputLabel>
                    <Select
                    required
                    value={type}
                    className={classes.input}
                    onChange={(e) => setType(e.target.value)}
                    variant="outlined" 
                    >
                        <MenuItem value="phone">Telephone</MenuItem>
                        <MenuItem value="tablet">Tablette</MenuItem>
                    </Select>
                    <TextField className={classes.input} required label='Prix' type="number" variant="outlined" value={price}  onChange={(e) => setPrice(e.target.value)} />
                    <TextField className={classes.input} required label='Garantie' type="number" variant="outlined" value={warranty_years} onChange={(e) => setWarranty(e.target.value)} />
                </Box>

                <Button variant="outlined" color="primary" onClick={() => addProduct()} className={classes.editProductButton}>
                    Ajouter le produit
                </Button>
                <Alert severity="success" style={{ display: success }}>Ce produit a été ajouté avec succès !</Alert>
                <Alert severity="error" style={{ display: error }}>Veuillez remplir tous les champs !</Alert>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.rightColumn}>
                <span>&nbsp;</span>
            </Grid>
          </Grid>
        </div>
        </>
    )
}

export default AddProduct;