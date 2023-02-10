const composer = require('openwhisk-composer')
const redis_config = {
        "redis": {
            "uri": "redis://redis:6379",
        }
}

module.exports = composer.parallel(
    composer.action('par1', {
        action: function({params, $composer=redis_config.redis}) {
            return {msg: 'par1 invoked'}
        }
    }),
    composer.action('par2', {
        action: function(params, $composer=redis_config.redis) {
            return {msg: 'par1 invoked'}
        }
    })
)