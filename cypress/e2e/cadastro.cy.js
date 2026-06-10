/// <reference types="cypress"/>
import { faker } from '@faker-js/faker';

describe('Funcionalidade: Cadastro no Hub de Leitura', () => {

    beforeEach(() => {
        cy.visit('register.html')
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
});