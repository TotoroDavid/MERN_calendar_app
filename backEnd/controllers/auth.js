/**
    controller to our router
    dir '../routes/auth.js'
 */
const { response } = require('express')
const bcrypt = require('bcryptjs')
const { generateJWT } = require('../helper/jwt')
//modelUserMongoDB
const User = require('../models/userModel')

/**
 * *create an user
 */
const createUser = async (req, res = response) => {
    // console.log(req.body)
    const { email, password } = req.body

    try {

        let user = await User.findOne({ email })
        // console.log(user)
        if (user) {
            return res.status(400).json({
                ok: false,
                msg: `The Email is in use already`
            })
        }

        user = new User(req.body)
        //Encrypt the password
        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync(password, salt)

        await user.save()

        //generate JWT
        const token = await generateJWT(user.id, user.name)

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Please contact with the administer'
        })
    }
}

/**
 * *LoginUser
 */
const loginUser = async (req, res = response) => {

    const { email, password } = req.body

    try {

        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: `The user doesn't exist with that email`
            })
        }
        //confirm the password
        const validPassword = bcrypt.compareSync(password, user.password)
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: `Password is wrong!!`
            })
        }

        //generate our JWT
        const token = await generateJWT(user.id, user.name)

        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Please contact with the administer'
        })
    }
}

/**
 * *validate the JWT
 */
const revalidateToken = async (req, res = response) => {

    try {

        const { uid, name } = req
        console.log({ uid, name });

        //generate JWT
        const token = await generateJWT(uid, name)

        res.json({
            ok: true,
            uid, name,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Please contact with the administer'
        })
    }


}

module.exports = {
    createUser,
    loginUser,
    revalidateToken
}