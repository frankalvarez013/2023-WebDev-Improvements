import merge from 'lodash.merge'
//hey process.env.NODE_ENV don't ovewrite it if it doesn't have anything write this
process.env.NODE_ENV = process.env.NODE_ENV || "development";
//maybe you want to run an environment version of your app on your computer so it would be local/stage
const stage = process.env.STAGE || 'local'
//dynamic config based on environment
let envConfig
if (stage === 'production'){
    //since we are using require we have to use default (since we are prob using import)
    envConfig = require('./prod').default
} else if (stage === 'testing'){
    envConfig = require('./testing').default
} else {
    envConfig = require('./local').default
}
//default config is gonna have all the variables we need
//we are saying the default port is 3000 but in production port will break so go to prodfile...
export default merge({
    stage,
    env: process.env.NODE_ENV,
    port: 3001,
    secrets: {
        jwt: process.env.JWT_SECRET,
        dbUrl: process.env.DATABASE_URL
    }
}, envConfig)