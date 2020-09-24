import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { Box,  Grid, InputLabel, makeStyles, MenuItem,  Select, TextField } from '@material-ui/core';
import phone from '../assets/img/singleproduct.jpg';
import Button from '@material-ui/core/Button';
import DialogComponent from '../components/Dialog';
import Alert from '@material-ui/lab/Alert';
import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:96');


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
    dialog: {
        padding: 100
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 20
    },
    editProductButton: {
        width: 300, 
        marginTop: 40,
        marginBottom: 40
    }
    
}));

function SingleProduct(props){

    const classes = useStyles();
    const [singleProduct, setSingleProduct] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [price, setPrice] = useState('');
    const [warranty_years, setWarranty] = useState('');
    const [success, setSuccess] = useState('none');
    
    useEffect(() => {
        const link = `http://localhost:96/api/products/${props.match.params.id}`;
        Axios.get(link)
        .then((data) => {
            setSingleProduct(data.data)
        })
        .catch((err) => {
            console.log(err)
        })
        socket.on('update', (product) => {
            setSingleProduct(product)
        })
    });

    const form = () => {
        return(
            <Box className={classes.form}>
                <TextField label='Nom' defaultValue={singleProduct.name} onChange={(e) => setName(e.target.value)} />
                <InputLabel>Type</InputLabel>
                <Select
                value={type}
                onChange={(e) => setType(e.target.value)}
                >
                <MenuItem value="phone">Telephone</MenuItem>
                <MenuItem value="tablet">Tablette</MenuItem>
                </Select>
                <TextField label='Prix' type="number" defaultValue={singleProduct.price} onChange={(e) => setPrice(e.target.value)} />
                <TextField label='Garantie' type="number" defaultValue={singleProduct.warranty_years} onChange={(e) => setWarranty(e.target.value)} />
            </Box>
        )
    }

    const updateProduct = () => {
        const body = {
            name,
            price,
            type,
            warranty_years
        }
        if(body.name === '') delete body.name;
        if(body.price === '') delete body.price;
        if(body.type === '') delete body.type;
        if(body.warranty_years === '') delete body.warranty_years;
    
        const link = `http://localhost:96/api/products/${props.match.params.id}`

        Axios.post(link, body)
        .then((data) => {
            if(data.status === 200) {
                setOpenDialog(false);
                setSuccess('')
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const deleteProduct = () => {
        const link = `http://localhost:96/api/products/delete/${props.match.params.id}`;
        Axios.post(link);
        props.history.push('/shop')
    }

    return (
        <div className={classes.root}>
            {singleProduct !== null  ? 
            <Grid container spacing={0}>
            <Grid item xs={12} sm={6} className={classes.leftColumn}>
                <Typography variant="h2" align="center" style={{ textTransform: 'capitalize' }}>
                    {singleProduct.name}
                </Typography>
                <Typography align="center" style={{ textTransform: 'capitalize' }}>
                    Type: {singleProduct.type}
                </Typography>
                <Typography align="center">
                    Prix: {singleProduct.price} €
                </Typography>
                <Typography align="center">
                    Garanti: {singleProduct.warranty_years} 
                </Typography>
                <Typography align="center">
                    Disponible: {singleProduct.available === true ? <>Oui</> : <>Non</>} 
                </Typography>
                <Typography align="center">
                    Note: {singleProduct.rating === 0 ? <>Non noté</> : <>{singleProduct.rating}</>} 
                </Typography>

                <Button variant="outlined" color="primary" onClick={() => setOpenDialog(true)} className={classes.editProductButton}>
                    Modifier le produit
                </Button>
                <Button variant="outlined" color="primary" onClick={() => deleteProduct()} className={classes.editProductButton}>
                    Supprimer le produit
                </Button>
                <Alert severity="success" style={{ display: success }}>Ce produit a été modifié avec succès !</Alert>
                <DialogComponent 
                openDialog = {openDialog}
                setOpenDialog = {setOpenDialog}
                title = "Modifier le produit"
                setCloseDialog = {() => setOpenDialog(false)}
                validForm = {() => updateProduct()}
                content={form()}
                >
                </DialogComponent>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.rightColumn}>
                <span>&nbsp;</span>
            </Grid>
          </Grid>
            : 
            null}
        </div>
    )
}

export default SingleProduct