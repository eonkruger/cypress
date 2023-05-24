// This is an example of how you might use the plugin in your tests
describe('My spec', function() {

    Cypress.Commands.add('setCookies', function () {
        
        const options = {
            username: Cypress.env('username'),
            password: Cypress.env('password'),
            loginUrl: Cypress.env('appUrl'),
            postLoginSelector: '#myselector',
            headless: true,
            logs: false
        }
        cy.task('AzureAdSingleSignOn', options).then(result => {
            cy.clearCookies()

            result.cookies.forEach(cookie => {
              cy.setCookie(cookie.name, cookie.value, {
                domain: cookie.domain,
                expiry: cookie.expires,
                httpOnly: cookie.httpOnly,
                path: cookie.path,
                secure: cookie.secure
              })
              Cypress.Cookies.preserveOnce(cookie.name)
            })
        })
    })   

    before(function() {
        cy.setCookies();
    })

    it('Visits the site as logged in user', function() {
        cy.visit(Cypress.env('appUrl'));
        cy.contains(`Hello, ${Cypress.env('username')}!`)
    })
})