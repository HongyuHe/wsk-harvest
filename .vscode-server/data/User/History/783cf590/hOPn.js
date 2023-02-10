const composer = require('openwhisk-composer')
const redis_config = {
    // "$composer": {
        "redis": {
            "uri": "redis://redis:6379",
        }
    // }
}

module.exports = composer.parallel(
    composer.action('par1', {
        action: function ($composer=redis_config.redis) {
            // console.log(params)
            return { msg: 'par1 invoked' }
        }
    }),
)