const crypto = require('crypto');
const algorithm = 'aes-256-ctr';

const iv = crypto.randomBytes(16);

function generateHash () {
    const uniqueText = crypto.randomBytes(16).toString('hex');
    return crypto.createHash('sha256').update(uniqueText).digest('hex');
}

function encrypt (secretText) {
    const cipher = crypto.createCipheriv(algorithm, process.env.CRYPTO_KEY, iv);

    const encrypted = Buffer.concat([cipher.update(secretText), cipher.final()]);

    return {
        iv: iv.toString('hex'),
        content: encrypted.toString('hex')
    };
}


function decrypt (hash) {

    const decipher = crypto.createDecipheriv(algorithm, process.env.CRYPTO_KEY, Buffer.from(hash.iv, 'hex'));

    const decrypt = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);

    return decrypt.toString();
}


module.exports = {
    encrypt,
    decrypt,
    generateHash
};