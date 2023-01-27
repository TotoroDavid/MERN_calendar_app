/**
    Routes of user /Auth
    host + /api/auth/
 */
const { Router } = require('express')
// const router = express.Router
const router = Router()
const { check } = require('express-validator')
//middleware
const { validateFields } = require('../middleware/validate-fields')
const { createUser, loginUser, revalidateToken } = require('../controllers/auth')
const { validateJWT } = require('../middleware/validate-jwt')

/**
 * *controllers
 */

//createUser
router.post(
    '/new',
    //middleware
    [
        check('name', 'the name is required').not().isEmpty(),
        check('email', 'the Email is required').isEmail(),
        check('password', 'the password need to have 6 characters').isLength({ min: 6 }),
        validateFields

    ],
    createUser)

//loginUSer    
router.post(
    '/',
    //middleware
    [
        check('email', 'the Email is required').isEmail(),
        check('password', 'the password need to have 6 characters').isLength({ min: 6 }),
        validateFields
    ],
    loginUser
)

// validate the JWT
router.get('/renew', validateJWT, revalidateToken)

module.exports = router