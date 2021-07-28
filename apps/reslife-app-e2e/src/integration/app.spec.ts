import { getGreeting } from '../support/app.po';
import {
  excused,
  expected,
  generateCheckInDocument,
  generateCheckInPath,
} from '../../testing-data/lists';

describe('reslife-app', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains(
      'Welcome to Reslife Apps. Choose a task to get started.'
    );
  });
});

describe('check-in', () => {
  beforeEach(() => {
    cy.visit('/check-in');
  });

  it('should display the check-in page', () => {
    cy.get('.page-title').contains('Check In');
  });

  describe('when check-in data is available', () => {
    let checkInPath: string;
    it('should have the current data and check-in selected', () => {
      checkInPath = generateCheckInPath();
      const checkInDoc = generateCheckInDocument();

      cy.callFirestore('delete', `check-ins/${checkInPath}/checked`);
      cy.callFirestore('delete', `check-ins/${checkInPath}/expected`);
      cy.callFirestore('delete', `check-ins/${checkInPath}/excused`);
      cy.callFirestore('set', `check-ins/${checkInPath}`, checkInDoc);
      cy.get('[data-testid="check-in-date"]').should(
        'have.value',
        new Date().toLocaleDateString()
      );
      cy.get('[data-testid="check-in-select"]').contains('Dinner');
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

      cy.get('@to-check-count').contains(expected.length.toString());
      cy.get('@checked-count').contains('0');

      cy.get('@to-check').find('button:first').click();
     
      cy.get('@to-check-count').contains((expected.length - 1).toString());
      cy.get('@checked-count').contains('1');
    });
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
