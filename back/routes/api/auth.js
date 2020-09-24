const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth =  require('../../middleware/auth');
const User = require('../../models/User');
const jwt =  require('jsonwebtoken');
const config = require('config');
const { check, validationResult, body } = require('express-validator');

// @route   GET api/auth
// @access Public

// Login

router.post('/', 
[
    check('email', 'Veuillez entrer un e-mail valide').isEmail(),
    check(
        'password',
        'Veuillez entrer un mot de passe'
    ).exists()

],
async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        const { email, password } = req.body
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ errors: [{ msg: "Veuillez vérifier les informations inscrites"}]})
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
                return res
                .status(400)
                .json({errors: [{ msg: 'Invalid Credentials' }]
            })
        }
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
        
    }
    catch(err){

    }
})

router.get('/', auth, async (req, res) =>  {
    try {
        const user = await User.findById(req.user.id).select('-password');
        return res.json(user);
    } catch (error) {
        console.error(error.message)
        return res.status(500).send('Server Error');
    }
});

module.exports = router;