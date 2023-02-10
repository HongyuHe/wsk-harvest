const composer = require('openwhisk-composer')

module.exports = composer.let(
    {"$composer": {"redis": {"uri": "redis://redis:6379"}}},
    composer.parallel(
        composer.action('par1', {
            action: function (params) {
                console.log($composer)
                return { msg: 'par1 invoked' }
            }
        }),
    )
)

