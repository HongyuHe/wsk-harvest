const composer = require('openwhisk-composer')

module.exports = composer.if_nosave(
    composer.action('branching', { 
        action: function ({ level }) {
            let lvl = Number(level)
            return { value: lvl >= 1, lvl: lvl } 
        } 
    }),
    composer.if_nosave(
        composer.action('branching', { 
            action: function ({ level }) {
                let lvl = Number(level)
                return { value: lvl >= 1, lvl: lvl } 
            } 
        }),
        composer.action('last-branch', { 
            action: function (params) { 
                return { message: `More than two levels (${params.lvl})`} 
            }     
        }),
        composer.action('stop-branching', { 
            action: function (params) { 
                return { message: `Total levels (${params.lvl})`} 
            }     
        }),
    ),
    composer.action('stop-branching', { 
        action: function (params) { 
                return { message: `Total levels (${params.lvl})`} 
        } 
    }),
)