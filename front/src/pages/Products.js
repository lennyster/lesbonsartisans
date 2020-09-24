import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Box, Link } from '@material-ui/core';
import { AiFillStar } from 'react-icons/ai';
import openSocket from 'socket.io-client';
import '../components/Products.css';

const socket = openSocket('http://localhost:96');


const useStyles = makeStyles({
    root: {
      minWidth: 275,
      marginTop: 20,
      marginBottom: 20,
    },
    title: {
      fontSize: 25,
      color: '#1a83ff', 
      textAlign: 'center',
      textTransform: 'uppercase'
    },
    pos: {
      marginBottom: 12,
      color:"#ffeb3b",
      marginTop: 10,
    },
    type: {
        textTransform: 'capitalize'
    },
    buttons: {
        justifyContent:'center'
    },
    link:{
        color: 'white'
    },
    h1_page: {
        marginTop: 30
    }
  });

function Products(){

    const classes = useStyles();
    const [products, setProducts] = useState(null);

    useEffect(
        () => {
        Axios.get('http://localhost:96/api/products/')
        .then((data) => {
            setProducts(data.data);
        })
        .catch((err) => {
            console.log(err)
        })
        socket.on('created', (products) => {
            setProducts(products)
        })
        socket.on('deleted', (products) =>{
            setProducts(products)
        })
    });

    return(
        <div className="products">
            <Box py={5} alignItems="center" display="flex" flexDirection="column" >
            <h1 className={classes.h1_page}>PRODUITS</h1>
            {products !== null && products !== undefined ? products.map((item, index) => {
                return(
                    <Card key={item._id} className={classes.root} >
                        <CardContent>
                            <Typography variant="h3" className={classes.title} gutterBottom>
                            {item.name}
                            </Typography>
                            <Typography align="center" variant="h6" color="textSecondary" className={classes.type}>
                            {item.type}
                            </Typography>
                            <Typography align="center" className={classes.pos}>
                            {<AiFillStar />} {item.rating}
                            </Typography>
                        </CardContent>
                        <CardActions className={classes.buttons}>
                            <Button size="small" variant="contained" color="secondary">
                                <Link href={`/product/${item._id}`} className={classes.link}>
                                    Voir Le Produit
                                </Link>
                            </Button>
                        </CardActions>
                    </Card>
                )
            }) : null
            }
            </Box>
        </div>
    )
}

export default Products;