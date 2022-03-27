const secretsModel = require('../../models/secrets.model');
const { encrypt, decrypt, generateHash } = require('../crypto-utilities/cryptoUtilities');
const { filteredSecrets } = require('../data-processor/index');
const {filterSecrets} = require('../data-processor');

async function getAllSecret(req, res) {
    const secrets = await secretsModel.find({});
    const filteredSecrets = filterSecrets(secrets);
    return res.status(200).json(filteredSecrets);
}

async function getSecret (req, res) {
    const hash = req.params.hash;
    if (!hash) {
        const error = new Error('Please, include the unique hash of the secret you want to see.');
        return res.status(400).json({ error: error.message});
    }

    const secret = await secretsModel.findOne({ hash });
    if (!secret) {
        const error = new Error('Such a secret does not exist. It has probably expired!');
        return res.status(404).json({ error: error.message })
    }

    const secretText = decrypt(secret?.secretText);

    return res.status(200).json({ secretText });
}

async function addASecret (req, res) {
    const { secretText } = req.body;

    if (!secretText) {
        const error = new Error('Please, provide a secret text.');
        return res.status(400).json({ error: error.message});
    }

    const newSecret = {
        hash: generateHash(),
        secretText: encrypt(secretText),
    }

    const secret = new secretsModel(newSecret);
    await secret.save();

    return res.status(201).json({success: 'Your secret has been successfully added!'});
}


module.exports = {
    getAllSecret,
    addASecret,
    getSecret
}