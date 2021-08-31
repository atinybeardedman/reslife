import {
  testRequests,
  MaintenanceRequest,
} from '@reslife/maintenance-request-model';
import { getDateString } from '@reslife/utils';
describe('maintenance request', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/maintenance');
    cy.callFirestore('delete', 'maintenanceRequests');
    for (const request of testRequests) {
      cy.callFirestore('set', `maintenanceRequests/${request.uid}`, request);
    }
  });

  describe('previous requests', () => {
    it('should display the previous requests', () => {
      cy.get('[data-testid="maintenance-request-table"] tbody tr').should(
        ($tr) => {
          expect($tr).to.have.length(4);
          const subjects = $tr.map(
            (i, el) => Cypress.$(el).children()[0].textContent
          ).toArray();
          console.log(testRequests.map((r) => r.subject));
          expect(subjects).to.deep.eq(testRequests.map((r) => r.subject));
        }
      );
    });
  });

  describe('new requests', () => {
    it('should allow the user to make a new request', () => {
      cy.get('[data-testid="new-request-button"]').click();
      const request: MaintenanceRequest = {
        subject: 'Broken Dryer',
        building: 'Reagan',
        request:
          "The right dryer is making string sounds and isn't drying things.",
        date: getDateString(),
      };
      cy.get('[data-testid="subject"]').type(request.subject);
      cy.get('[data-testid="building"]').click();
      cy.get('mat-option').contains(request.building).click();
      cy.get('[data-testid="request"]').type(request.request);
      cy.get('button').contains('Submit').click();

      cy.get(
        '[data-testid="maintenance-request-table"] tbody tr:first-child'
      ).should('contain.text', request.subject);
    });
  });
});
