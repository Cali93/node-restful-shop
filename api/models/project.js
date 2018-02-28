const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    meshes: { type: Array, required: true }
});

module.exports = mongoose.model('Project', projectSchema);