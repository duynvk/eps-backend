const express = require('express')
const User = require('../models/userModel')
const auth = require('../middlewares/authMiddleware')

const router = express.Router()

// Get group_id of the user
router.get('/users/:id/group', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('group_id');
        
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        res.send({ group_id: user.group_id });
    } catch (error) {
        res.status(500).send({ error: 'Server error' });
    }
});

router.post('/users', async (req, res) => {
    // Create a new user
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/users/login', async(req, res) => {
    //Login a registered user
    try {
        const { email, password } = req.body
        const user = await User.findByCredentials(email, password)
        if (!user) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/users/me', auth, async(req, res) => {
    // View logged in user profile
    res.send(req.user)
})

router.post('/users/me/logout', auth, async (req, res) => {
    // Log user out of the application
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/users/me/logoutall', auth, async(req, res) => {
    // Log user out of all devices
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

// Change password endpoint
router.post('/users/change-password', auth, async (req, res) => {
    try {
        const user = req.user; // Get the authenticated user
        const { currentPassword, newPassword } = req.body;

        // Validate current password
        const isPasswordMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordMatch) {
            return res.status(400).send({ error: 'Current password is incorrect' });
        }

        // Validate new password length
        if (newPassword.length < 7) {
            return res.status(400).send({ error: 'New password must be at least 7 characters long' });
        }

        // Hash and update the new password
        user.password = newPassword;
        await user.save();

        res.send({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;