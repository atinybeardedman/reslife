

describe('reslife-request', () => {
 
  beforeEach(() => {
    cy.clearIndexedDB();
    cy.visit('/')
  });

  it('should display login message', () => {
  
   cy.get('mat-card').should('contain.text', 'Login');
  });
});
