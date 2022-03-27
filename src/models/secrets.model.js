const mongoose = require('mongoose');

const secretsSchema = new mongoose.Schema({
    hash: {
        type: String,
        require: [true, 'Please, provide a unique hash for this secret.']
    },

    secretText: {
        type: Object,
        require: [true, 'Please, provide a secret text for this secret.']
    },

    expireAt: {
        type: Date,
        default: Date.now,
    }

}, {
    timestamps: true
})

secretsSchema.index({ expireAt: 1 }, { expireAfterSeconds: 60})

const Secrets = mongoose.model('secrets', secretsSchema);

module.exports = Secrets;