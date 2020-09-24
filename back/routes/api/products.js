const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Product = require('../../models/Product');

// Create

router.post('/create', 
    [
        check('name', 'Le nom est requis')
        .not()
        .isEmpty()
        .isLength({ min: 2 }),
        check('type')
        .not()
        .isEmpty(),
        check('price', 'Le prix est requis')
        .not()
        .isEmpty(),
        check('warranty_years', "Le nombre d'années de garantie est requise")
        .not()
        .isEmpty(),
    ],
    async (req, res) => {
    var io = req.app.get('socketio');
    const { name, type, price, rating, warranty_years, available } = req.body
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
        try {
            const product = new Product({
            name,
            type,
            price,
            rating,
            warranty_years,
            available
        })

            await product.save();
            const filter = {};
            const all = await Product.find(filter);
            io.emit('created', all)
            return res.json()
        }
        catch(err){
            console.log(err)
        }
});

// Read by id

router.get('/:id', async (req, res) => {
    let product = await Product.findOne({ _id: req.params.id });
    res.json(product)
})

// Update

router.post('/:id', async (req, res) => {
    var io = req.app.get('socketio');
    let product = await Product.findOne({ _id: req.params.id });
    await product.updateOne(req.body);
    const updatedProduct = await Product.findOne({ _id: req.params.id });
    io.emit('update', 
        updatedProduct
    )
    return res.json()
})

// Delete

router.post('/delete/:id', async function(req, res, next) {
    const id = req.params.id;
    Product.findOneAndDelete(id).exec();
    const filter = {};
    const all = await Product.find(filter);
    io.emit('deleted', all)
    return res.json()
});

// Read all 

router.get('/', async (req, res, next) => {
    const filter = {};
    const all = await Product.find(filter);
    return res.json(all)
})

module.exports = router;