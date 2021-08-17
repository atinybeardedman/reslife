import { testBoarder } from '@reslife/shared-models';
import { testCurrentSignout } from '@reslife/student-signout-model'
describe('student-signout', () => {
 const signout = testCurrentSignout;
  beforeEach(() => {
    cy.callFirestore('delete', 'boarders')
    cy.callFirestore('set', `boarders/${testBoarder.uid}`, testBoarder);
    cy.visit('/student-signout');
  });

  it('should display the student signout page', () => {
    cy.get('.page-title').contains('Student Signout');
  });

  describe('when signouts currently exist', () => {
    beforeEach(() => {
        cy.callFirestore('delete', 'signouts');
        cy.callFirestore('set', `signouts/${signout.uid}`, signout);
    })
    it('should display current signouts', () => {
      cy.get('[data-testid="signouts-table"]').should('contains.text',signout.student.name);
    });
    it('should allow a student to be signed in', () => {
      cy.get('[data-testid="signIn-button"]')
        .click()
        .then(() => {
          cy.get('h1')
            .contains('No Students Signed Out').then(el => {
                expect(el).to.not.be.null;
            })
        });
    });
  });

  describe('When no signouts exist', () => {
      
      it('should allow a new signout to be created', () => {
              cy.get('[data-testid="new-signout-button"]')
                .click()
                .then(() => {
                  /* eslint-disable cypress/no-unnecessary-waiting*/
                  cy.wait(500);
                  cy.get('input').as('search');
                  cy.get('@search').click()
                    .type(testBoarder.firstName.substr(0,4), {delay: 100, waitForAnimations: true})
                  cy.get('mat-option').click();
                }).then(() => {
                    cy.get('input[formcontrolname="destination"]').type("Starbucks");
                    cy.get('mat-select').click();
                    cy.get('mat-option').contains('Walk').click();
                    cy.get('button').contains('Sign Out').click();
                }).then(() => {
                    cy.get('[data-testid="signouts-table"]').should('contain.text', testBoarder.name)
                })
        })
  })
});
