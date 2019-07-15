const { Schema, model } = require('mongoose')

const db = {
 Book: require('./Books.js')(Schema, model),
}

module.exports = db