/// <reference types="cypress"/>
import { faker } from '@faker-js/faker';
import cadastroPage from '../support/pages/cadastro-page';

describe('Funcionalidade: Cadastro no Hub de Leitura', () => {

    beforeEach(() => {
        cadastroPage.visitarPaginaCadastro()
    });

    it('Deve fazer cadastro com sucesso, usando função JS', () => {
        let email = `teste${Date.now()}@teste.com`
        cy.get('#name').type('Rodrigo')
        cy.get('#email').type(email)
        cy.get('#phone').type('5111111111')
        cy.get('#password').type('Teste@123')
        cy.get('#confirm-password').type('Teste@123')
        cy.get('#terms-agreement').check()
        cy.get('#register-btn').click()
        cy.url().should('include', 'dashboard')

    });

    it('Deve fazer cadastro com sucesso usando Faker', () => {
        let email = faker.internet.email()
        let nome = faker.person.fullName()
        cy.get('#name').type(nome)
        cy.get('#email').type(email)
        cy.get('#phone').type('5111111111')
        cy.get('#password').type('Teste@123')
        cy.get('#confirm-password').type('Teste@123')
        cy.get('#terms-agreement').check()
        cy.get('#register-btn').click()
        cy.url().should('include', 'dashboard')
        cy.get('#user-name').should('contain', nome)

    });

    it('Deve preencher cadastro com sucesso - Usando comando customizado', () => {
        let email = `teste${Date.now()}@teste.com`
        let nome = faker.person.fullName ({ sex: 'male' })
        cy.preencherCadastro(nome, email, '912345678', 'Teste@123', 'Teste@123')
        cy.url().should('include', 'dashboard')
    });

    it('Deve fazer cadastro com sucesso - Usando Page Objects', () => {
        let email = `teste${Date.now()}@teste.com`
          cadastroPage.preencherCadastro('rodrigo', email, '9123456789', 'senha123', 'senha123')
    });

    it('Deve validar mensagem ao tentar cadastrar sem preencher nome', () => {
        cadastroPage.preencherCadastro('', 'rodrigo@teste.com', '9123456789', 'senha123', 'senha123')
        cy.get(':nth-child(1) > .invalid-feedback').should('contain', 'Nome deve ter pelo menos 2 caracteres')
    });

    it('Deve validar mensagem ao tentar cadastrar senhas diferentes', () => {
        cadastroPage.preencherCadastro('', 'rodrigo@teste.com', '9123456789', 'senha123', 'senha321')
        cy.get(':nth-child(5) > .invalid-feedback').should('contain', 'Senhas não coincidem')
    });

});