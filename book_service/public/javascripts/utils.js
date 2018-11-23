let crypto = require("crypto")
const init_token = "TKL02o"

function getMD5Password (id) {
    const md5 = crypto.createHash("md5")
    let token_before = init_token + id
    return md5.update(token_before).digest("hex")
}

module.exports = {
    getMD5Password
}
