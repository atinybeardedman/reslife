import { getGreeting } from '../support/app.po';



describe('reslife-app', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().should('contain.text',
      'Welcome to Reslife Apps. Choose a task to get started.'
    );
  });
});


// describe('boarder-management', () => {
//   beforeEach(() => {
//     cy.visit('/admin/manage-boarders');
//   });

//   it('should display the manage boarders page', () => {
//     cy.get('.page-title').contains('Admin: Boarder Management');
//   })
// })

