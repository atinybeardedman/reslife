describe('reslife-app', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/');
  });

  it('should display welcome message', () => {
    cy.get('.mat-card')
      .should('contain.text', 'Welcome to Reslife Apps.')
      .should('contain.text', 'Choose a task from the menu to get started.');
  });
});
