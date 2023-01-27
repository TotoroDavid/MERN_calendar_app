const moment = require("moment/moment")

const isDate = (value, { req, location, path }) => {
    // // console.log(value)
    // console.log({ path, /*req,location */ })
    if (!value) {
        return false
    }
    const date = moment(value)
    if (date.isValid()) {
        return true
    } else {
        return false
    }
}

module.exports = { isDate }