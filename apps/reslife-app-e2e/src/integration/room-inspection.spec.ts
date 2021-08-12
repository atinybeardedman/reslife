import { generateDocs } from '@reslife/room-inspection-model';
describe('room inspection', () => {
  beforeEach(() => {
    cy.visit('/room-inspection');
  });

  it('should show the correct page title', () => {
    cy.get('.page-title').contains('Room Inspection');
  });

  describe('on selection', () => {
    beforeEach(() => {
      cy.callFirestore('set', 'roomInspections/2021-09-14+Reagan', {
        dorm: 'Reagan',
        date: '2021-09-14',
      });
      const inspectionDocs = generateDocs();
      for (const doc of inspectionDocs) {
        cy.callFirestore(
          'set',
          `roomInspections/2021-09-14+Reagan/students/${doc.uid}`,
          doc
        );
      }
      cy.get('[data-testid="inspection-date"]').as('date-input');
      cy.get('[data-testid="dorm-select"]').as('dorm-select');
      cy.get('@date-input').clear().type('9/14/2021');
      cy.get('@dorm-select')
        .focus()
        .click()
        .then(() => {
          cy.get('mat-option').contains('Reagan').click();
        });
    });
    it('should display the correct values', () => {
      cy.get('[data-testid="inspection-date"]').as('date-input');
      cy.get('[data-testid="dorm-select"]').as('dorm-select');
      cy.get('@date-input').should('have.value', '9/14/2021');

      cy.get('@dorm-select').should('contain.text', 'Reagan');
    });

    describe('the two lists', () => {
      it('should display the 2 lists', () => {
        cy.get('[data-testid="to-inspect-list"]').should('exist');
        cy.get('[data-testid="inspected-list"]').should('exist');
      });
      it('should display the correct counts', () => {
        cy.get(
          '[data-testid="to-inspect-list"] [data-testid="inspection-count"]'
        ).should('contain.text', 2);
        cy.get(
          '[data-testid="inspected-list"] [data-testid="inspection-count"]'
        ).should('contain.text', 4);
      });
    });

    describe('actions', () => {
      it('should allow passing a student', () => {
        cy.get('[data-testid="to-inspect-list"] button')
          .contains('thumb_up')
          .click();
        cy.get(
          '[data-testid="to-inspect-list"] [data-testid="inspection-count"]'
        ).should('contain.text', 1);
        cy.get(
          '[data-testid="inspected-list"] [data-testid="inspection-count"]'
        ).should('contain.text', 5);
      });
      it('should allow failing a student', () => {
        cy.get('[data-testid="to-inspect-list"] button')
          .contains('thumb_down')
          .click();
        cy.get('input#fail-reason').type('Trash');
        cy.get('button').contains('Save').click();
        cy.get(
          '[data-testid="to-inspect-list"] [data-testid="inspection-count"]'
        ).should('contain.text', 1);
        cy.get(
          '[data-testid="inspected-list"] [data-testid="inspection-count"]'
        ).should('contain.text', 5);
      });

      it('should allow a reversing a status of a student already inspected', () => {
        cy.get('[data-testid="inspected-list"] mat-list-item').contains('Test Student 6').parent().as('last-item');
        cy.get('@last-item')
          .should('contain.text', 'thumb_down')
        cy.get('@last-item').within(() => {
            cy.get('button')
            .contains('swap_horiz')
            .click();
        })
        cy.get('@last-item').should('contain.text', 'thumb_up');
      });
    });
  });
});
