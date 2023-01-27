/**
 * controllers events
 * calendar
 */
const { response } = require('express')
const Event = require('../models/eventModel')

/**
 * * get the events!!
 */
const getEvents = async (req, res = response) => {
    const event = await Event.find() //
        .populate('user', 'name')

    res.json({
        ok: true,
        event
    })
}

/**
 * *createEvent
 */
const createEvent = async (req, res = response) => {

    const event = new Event(req.body)

    try {

        event.user = req.uid
        const eventDB = await event.save()

        res.json({
            ok: true,
            eventDB
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: `try to contact with the administrator . . .`
        })
    }
}

/**
 * *updateEvent
 */
const updateEvent = async (req, res = response) => {

    const eventId = req.params.id
    // console.log(eventId)
    const uid = req.uid
    // console.log(uid)

    try {

        const event = await Event.findById(eventId);
        console.log(event) //null

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'Event does not exist with that ID'
            })
        }
        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: `You don't have the privilege to edit this event`
            })
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const updateEvent = await Event.findByIdAndUpdate(eventId, newEvent, { new: true })

        res.json({
            ok: true,
            event: updateEvent
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: `please contact with the administrator of the site!!`
        })
    }
}

/**
 * *deleteEvent
 */
const deleteEvent = async (req, res = response) => {

    const eventId = req.params.id
    const uid = req.uid

    try {

        const event = await Event.findById(eventId);
        console.log(event) //null

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'Event does not exist with that ID'
            })
        }
        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: `You don't have the privilege to edit this event`
            })
        }

        await Event.findByIdAndDelete(eventId)

        res.json({
            ok: true,
            msg: `The event was deleted!!`
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: `please contact with the administrator of the site!!`
        })
    }
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
}