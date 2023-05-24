// This goes in cypress/plugins/index.js
const AzureAdSingleSignOn = require('./azure-ad-sso/plugin').AzureAdSingleSignOn

module.exports = (on, config) => {
    on('task', {AzureAdSingleSignOn:AzureAdSingleSignOn})
}