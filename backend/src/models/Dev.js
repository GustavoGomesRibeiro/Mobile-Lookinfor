const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const PointSchema = require('../utils/PointSchema');

const DevSchema = new mongoose.Schema({
    name: String,
    username: {
        type: String,
        require: true,
    },
    password:  {
        type: String,
        require: true,
        select: false,
    },
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String],
    location: {
        type: PointSchema,
        index: '2dsphere'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

DevSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash
    next();
});

module.exports = mongoose.model('Dev', DevSchema);