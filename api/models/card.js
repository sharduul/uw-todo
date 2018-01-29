var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var cardSchema = mongoose.Schema({
    title: String,
    effort: Number,
    description: String,
    startDate: String,
    endDate: String,
    isDone: Boolean,
    columnId: String,
    boardId: String,
    order: Number
});

module.exports = mongoose.model('Card', cardSchema);
