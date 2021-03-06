import {
    excused,
    expected,
    generateCheckInDocument,
    generateCheckInPath,
  } from '../../testing-data/check-in-lists';
describe('check-in', () => {
  let checkInPath: string;
    beforeEach(() => {
      checkInPath = generateCheckInPath();
      const checkInDoc = generateCheckInDocument();
      cy.login();
      cy.callFirestore('delete', `check-ins/${checkInPath}/expected`);
      cy.callFirestore('delete', `check-ins/${checkInPath}/excused`);
      cy.callFirestore('delete', `check-ins/${checkInPath}/checked`);
  
      cy.callFirestore('set', `check-ins/${checkInPath}`, checkInDoc);
      cy.visit('/check-in');
    });
  
    it('should display the check-in page', () => {
      cy.get('.page-title').should('contain.text', 'Check In');
    });
  
    describe('when check-in data is available', () => {
      it('should have the current data and check-in selected', () => {
  
        cy.get('[data-testid="check-in-date"]').should(
          'have.value',
          new Date().toLocaleDateString()
        );
        cy.get('[data-testid="check-in-select"]').should('contain.text', 'Dinner');
      });
  
      it('should move a student from "To Check" to "Checked when clicked', () => {
        for (const s of expected) {
          cy.callFirestore(
            'set',
            `check-ins/${checkInPath}/expected/${s.uid}`,
            s
          );
        }
  
        for (const s of excused) {
          cy.callFirestore('set', `check-ins/${checkInPath}/excused/${s.uid}`, s);
        }
  
        cy.get('[data-testid="to-check-checklist"]').as('to-check');
  
        cy.get('[data-testid="checked-checklist"]').as('checked');
        cy.get('@to-check').within(() => {
          cy.get('[data-testid="checklist-count"]').as('to-check-count');
        });
        cy.get('@checked').within(() => {
          cy.get('[data-testid="checklist-count"]').as('checked-count');
        });
  
        cy.get('@to-check-count').should('contain.text', expected.length.toString());
        cy.get('@checked-count').should('contain.text', '0');
  
        cy.get('@to-check').find('button:first').click();
       
        cy.get('@to-check-count').should('contain.text', (expected.length - 1).toString());
        cy.get('@checked-count').should('contain.text', '1');
      });
    });
  });