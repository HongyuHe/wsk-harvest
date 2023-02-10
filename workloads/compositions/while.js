const composer = require('openwhisk-composer')

module.exports = composer.while(
    composer.action('check-depth', {
        action: function(params) {
            let depth = parseInt(params.depth)
            return {value: depth > 0, depth: depth}
        }
    }),
    composer.action('while-loop', {
        action: function(params) {
            return {depth: --params.depth}
        }
    })
)