const composer = require('openwhisk-composer')

module.exports = composer.parallel(
    composer.action('par1', {
        action: function (params) {
            console.log(params)
            return { msg: 'par1 invoked' }
        }
    }),
)

