import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
    title: { type: String, require: true },
    content: { type: String, require: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: {
        type: Date,
        default: Date.now
    },
});
module.exports = mongoose.model('Blog', BlogSchema);