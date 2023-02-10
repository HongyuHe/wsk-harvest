const composer = require('openwhisk-composer')

module.exports = composer.if_nosave(
    composer.action('authenticate', { 
        action: function ({params}) {
            console.log(params)
            let pswd = parseInt(params.password)
            return { value: pswd == 123, name: 'authfunc', password: pswd } 
        } 
    }),
    composer.action('success', { 
        action: function (params) { 
            return { message: 'success from ' +  params.name + ' with password: ' + params.password} 
        }     
    }),

    //! NO nested branching allowed
    // composer.if_nosave(
    //     composer.action('authenticate', { 
    //         action: function (params) {
    //             return { value: parseInt(params.password) == 123, name: 'authfunc' } 
    //         } 
    //     }),
    //     composer.action('success', { 
    //         action: function (params) { 
    //             return { message: 'success from ' +  params.name + ' with return ' + params.value} 
    //         }     
    //     }),
    //     composer.action('failure', { 
    //         action: function (params) { 
    //             return { message: 'failure with ' + params.password } 
    //         } 
    //     }),
    // ),
    composer.action('failure', { 
        action: function (params) { 
                return { message: 'failure with password:' + params.password } 
                // return { message: 'failure' } 
        } 
    }),
)