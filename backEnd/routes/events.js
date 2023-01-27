/**
 * routes events
 * calendar /api/events
 */
const { Router } = require('express')
const { check } = require('express-validator')
const { validateJWT } = require('../middleware/validate-jwt')
const { validateFields } = require('../middleware/validate-fields')
const { getEvents, createEvent, updateEvent, deleteEvent, } = require('../controllers/events')
const { isDate } = require('../helper/isDate')

const router = Router()
//validate JWT for my routes ex: router.get('/', validateJWT, getEvents)
router.use(validateJWT)

// get the events
router.get('/', getEvents)

// create a new event
router.post(
    '/',
    //expressValidator
    [
        check('title', 'The title is required').not().isEmpty(),
        check('start', 'The start date is required').custom(isDate),
        check('end', 'The end date is required').custom(isDate),
        validateFields
    ],
    createEvent
)

// update the event
router.put(
    '/:id',
    [
        check('title', 'The title is required').not().isEmpty(),
        check('start', 'the start date is required').custom(isDate),
        check('end', 'the end date is required').custom(isDate),
        check('id', 'Id is not valid').isMongoId(),
        validateFields
    ],
    updateEvent)

// delete the event
router.delete(
    '/:id',
    deleteEvent)

module.exports = router