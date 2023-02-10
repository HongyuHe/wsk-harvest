const composer = require('openwhisk-composer')

module.exports = composer.if_nosave(
    composer.action('authenticate', { 
        action: function ({ password }) {
            return { value: parseInt(password) === 123, name: 'authfunc', password: password } 
        } 
    }),
    // composer.action('success', { 
    //     action: function (params) { 
    //         return { message: 'success from ' +  params.name + ' with return ' + params.value} 
    //     }     
    // }),
    composer.if_nosave(
        composer.action('authenticate', { 
            action: function (params) {
                return { value: parseInt(params.password) === 123, name: 'authfunc' } 
            } 
        }),
        composer.action('success', { 
            action: function (params) { 
                return { message: 'success from ' +  params.name + ' with return ' + params.value} 
            }     
        }),
        composer.action('failure', { 
            action: function () { 
                return { message: 'failure' } 
            } 
        }),
    ),
    composer.action('failure', { 
        action: function () { 
            return { message: 'failure' } 
        } 
    }),
)