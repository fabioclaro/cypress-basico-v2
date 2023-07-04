/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
   beforeEach(function () {
      cy.visit('./src/index.html')
   })

   it('verifica o título da aplicação', function () {
      cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')

   })

   it('preenche os campos obrigatórios e envia o formulário', function () {
      const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste,teste, teste, teste, teste, teste, teste,teste, teste, teste, teste, teste, teste,teste, teste, teste, teste, teste, teste.'

      cy.get('#firstName').type('Fabio')
      cy.get('#lastName').type('Claro')
      cy.get('#email').type('fabio@test.com')
      cy.get('#open-text-area').type(longText, { delay: 0 })
      cy.get('button[type="submit"]').click()

      cy.get('.success').should('be.visible')
   })

   it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
      cy.get('#firstName').type('Fabio')
      cy.get('#lastName').type('Claro')
      cy.get('#email').type('fabio@test,com')
      cy.get('#open-text-area').type('test')
      cy.get('button[type="submit"]').click()

      cy.get('.error').should('be.visible')
   })

   it('campo telefone continua vazio quando preenchido com valor não-numérico', function () {
      cy.get('#phone')
      .type('abcdefghij')
      .should('have.value', '')
   })
   
   it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
      cy.get('#firstName').type('Fabio')
      cy.get('#lastName').type('Claro')
      cy.get('#email').type('fabio@test.com')
      cy.get('#phone-checkbox').click()
      cy.get('#open-text-area').type('test')
      cy.get('button[type="submit"]').click()

      cy.get('.error').should('be.visible')
   })

   it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
      cy.get('#firstName')
      .type('Fabio')
      .should('have.value', 'Fabio')
      .clear()
      .should('have.value', '')
      cy.get('#lastName')
      .type('Claro')
      .should('have.value', 'Claro')
      .clear()
      .should('have.value', '')
      cy.get('#email')
      .type('fabio@test.com')
      .should('have.value', 'fabio@test.com')
      .clear()
      .should('have.value', '')
      cy.get('#phone')
      .type('123456789')
      .should('have.value', '123456789')
      .clear()
      .should('have.value', '')
   })

   it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
      cy.get('button[type="submit"]').click()

      cy.get('.error').should('be.visible')
   })

   it('envia o formuário com sucesso usando um comando customizado', function () {
      cy.fillMandatoryFieldsAndSubmit()

      cy.get('.success').should('be.visible')
   })

   it('Utilizando o comando contains no lugar do comando get', function () {
         cy.contains('button', 'Enviar').click()
   
         cy.get('.error').should('be.visible')
   })

   it('seleciona um produto (YouTube) por seu texto', function () {
      cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')
   })

   it('Selecionar um produto (Mentoria) por seu valor (value)', function () {
      cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')
   })

   it.only('Selecionar um produto (Blog) por seu índice', function () {
      cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
   })

   it.only('Marcar o tipo de atendimento "feedback"', function () {
      cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('have.value', 'feedback')
   })

   it.only('marcar cada tipo de atendimento', function () {
      cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio) {
          cy.wrap($radio).check()
          cy.wrap($radio).should('be.checked')
        })
   })
})

