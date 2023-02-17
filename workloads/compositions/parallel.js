const composer = require('openwhisk-composer')

module.exports = composer.parallel(
    composer.action('par1', {
        action: function (params) {
            console.log(params)
            return { msg: 'par1 invoked' }
        }
    }),
    composer.action('par2', {
        action: function (params) {
            console.log(params)
            return { msg: 'par2 invoked' }
        }
    }),
    composer.action('par3', {
        action: function (params) {
            console.log(params)
            return { msg: 'par3 invoked' }
        }
    }),
    composer.action('par4', {
        action: function (params) {
            console.log(params)
            return { msg: 'par4 invoked' }
        }
    }),
)

