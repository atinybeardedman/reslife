import { getGreeting } from '../support/app.po';

describe('reslife-app', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    // Custom command example, see `../support/commands.ts` file
    // cy.login('my-email@something.com', 'myPassword');

    // Function helper example, see `../support/app.po.ts` file
    getGreeting().contains('Welcome to Reslife Apps. Choose a task to get started.');
  });
});

describe('check-in', () => {
  beforeEach(() => {
    cy.visit('/check-in');
    // need to seed the database here to make this work
  })

  it('should display the check-in page', () => {
    cy.get('.page-title').contains('Check In');
  });

  // it('should move a student from "To Check" to "Checked when clicked', () => {
  //   cy.get('.date-input').focus().type('09/12/2021').blur();
  //   cy.get('.check-in-select').select('Dinner');
  //   cy.get('.to-check-list').within($checklist => {
  //     cy.root().get('checked-list .count').as('checked-count');
  //     cy.get('@checked-count').should('have.text', '0');
  //     cy.get('.count').should('have.text', '2');
  //     cy.get('button:first').click();
  //     cy.get('.count').should('have-text', '1');
  //     cy.root().get('@checked-count').should('have.text','1');
  //   });
  // })

})
