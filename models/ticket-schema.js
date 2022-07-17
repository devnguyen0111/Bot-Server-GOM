const mongoose = require('mongoose');

const reqString = {
    type: String,
    required: true,
}

const ticketSchema = mongoose.Schema({
    _id: reqString,
    channelId: reqString,
    text: reqString
})

module.exports = mongoose.model('ticket', ticketSchema)