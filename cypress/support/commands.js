Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Fabio')
    cy.get('#lastName').type('Claro')
    cy.get('#email').type('fabio@test.com')
    cy.get('#open-text-area').type('teste')
    cy.get('button[type="submit"]').click()
})