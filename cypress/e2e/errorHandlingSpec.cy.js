context('Errors', () => {
    it('shows "Something went wrong ..." in case of a server error', () => {
        cy.intercept(
            'GET',
            '**/search**',
            { statusCode: 500 }
        ).as('getServerFailure')

        cy.visit('/')
        cy.wait('@getServerFailure')

        cy.get('p:contains(Something went wrong ...)').should('be.visible')
    })

    it('shows "Something went wrong ..." in case of a network error', () => {
        cy.intercept(
            'GET',
            '**/search**',
            { forceNetworkError: true }
        ).as('getNetworkFailure')

        cy.visit('/')
        cy.wait('@getNetworkFailure')

        cy.get('p:contains(Something went wrong ...)').should('be.visible')
    })
})