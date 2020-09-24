const { json } = require('express');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken'); 
const config = require('config');
const User = require('../../models/User');

router.post('/', 
    [
        check('email', 'Veuillez entrer un e-mail valide')
        .isEmail(),
        check('password', 'Veuillez entrer un mot de passe à 6 caractères minimum')
        .isLength({ min: 6 }),
    ],
    async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        const { email } = req.body
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ errors: [{ msg: "L'email est deja prise."}]})
        }

        user = new User({
            "email": req.body.email,
            "password": req.body.password,
        })

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);
        await user.save();
        const payload = {
            user: {
                id: user._id
            }
        }

        jwt.sign(
            payload, 
            config.get('jwtToken'),
            { expiresIn: 360000 },
            (err, token) => {
                if(err) throw err;
                return res.json({ token });
            }
        )
    } catch (error) {
        console.log(error)
    }
});

router.get('/', (req, res) => {
    res.send('User route')
})

module.exports = router;