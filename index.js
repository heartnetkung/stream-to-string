var StringDecoder = require('string_decoder').StringDecoder;

module.exports = function (stream, enc, cb) {
    if (typeof enc === 'function') {
        cb = enc
        enc = null
    }
    cb = cb || function () {}

    var str = ''
    var decoder = (typeof enc === 'string')? new StringDecoder(enc): new StringDecoder();

    return new Promise (function (resolve, reject) {
        stream.on('data', function (data) {
            str += decoder.write(data)
        })
        stream.on('end', function () {
            resolve(str)
            cb(null, str)
        })
        stream.on('error', function (err) {
            reject(err)
            cb(err)
        })
    })
}
