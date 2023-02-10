const composer = require('openwhisk-composer')

module.exports = composer.seq(
    composer.action('seq1', {
        action: function () {
            return { msg: 'seq1 invoked' }
        }
    }),
    composer.action('seq2', {
        action: function () {
            return { msg: 'seq2 invoked' }
        }
    }),
)