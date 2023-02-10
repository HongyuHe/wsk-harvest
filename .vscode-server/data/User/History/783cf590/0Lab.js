const composer = require('openwhisk-composer')

module.exports = composer.parallel(
    composer.action('par1', {
        action: function(params) {
            return {msg: 'par1 invoked'}
        }
    }),
    composer.action('par2', {
        action: function(params) {
            return {msg: 'par1 invoked'}
        }
    })
)