const filterSecrets = (secrets) => {
    return secrets.map((secret) => {
        return {
            _id: secret?._id,
            hash: secret?.hash
        }
    });
}

module.exports = {
    filterSecrets
}